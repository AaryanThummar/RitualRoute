/**
 * RitualRoute - Firebase & Local Database Service
 * Provides unified CRUD operations with automatic Firebase Firestore integration
 * and graceful fallback to local JSON database (data/db.json) if keys are pending.
 */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const DB_FILE = path.join(__dirname, '..', 'data', 'db.json');

let dbMode = 'local_fallback'; // 'firebase' or 'local_fallback'
let firestore = null;

// Initialize Firebase Admin SDK if credentials exist
function initFirebase() {
  try {
    const admin = require('firebase-admin');

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

    if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      firestore = admin.firestore();
      dbMode = 'firebase';
      console.log('✅ Connected successfully to Firebase Firestore via Service Account file.');
      return;
    }

    if (projectId && clientEmail && privateKey) {
      // Clean up escaped newlines in private key
      privateKey = privateKey.replace(/\\n/g, '\n');
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey
        })
      });
      firestore = admin.firestore();
      dbMode = 'firebase';
      console.log('✅ Connected successfully to Firebase Firestore via Environment Variables.');
      return;
    }

    console.log('ℹ️ No Firebase credentials detected in .env - Running in resilient Local Database mode (data/db.json).');
    dbMode = 'local_fallback';
  } catch (err) {
    console.warn('⚠️ Firebase initialization warning:', err.message);
    console.log('ℹ️ Falling back gracefully to Local Database mode (data/db.json).');
    dbMode = 'local_fallback';
  }
}

// Local JSON File Helper
function readLocalData() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return { wedding: {}, rituals: [], guests: [], budget: [], vendors: [], tasks: [] };
    }
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local db:', err);
    return { wedding: {}, rituals: [], guests: [], budget: [], vendors: [], tasks: [] };
  }
}

function writeLocalData(data) {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing local db:', err);
    return false;
  }
}

// Unified Database API
const dbService = {
  getMode: () => dbMode,

  // Get entire collection
  async getCollection(collectionName) {
    if (dbMode === 'firebase' && firestore) {
      try {
        const snapshot = await firestore.collection(collectionName).get();
        const items = [];
        snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
        return items;
      } catch (err) {
        console.error(`Firebase fetch error on ${collectionName}:`, err.message);
        // fallback to local if firebase throws permission or connection error
      }
    }
    const local = readLocalData();
    return local[collectionName] || [];
  },

  // Get single document
  async getDoc(collectionName, id) {
    if (dbMode === 'firebase' && firestore) {
      try {
        const docRef = await firestore.collection(collectionName).doc(id).get();
        if (docRef.exists) {
          return { id: docRef.id, ...docRef.data() };
        }
        return null;
      } catch (err) {
        console.error(`Firebase getDoc error on ${collectionName}/${id}:`, err.message);
      }
    }
    const local = readLocalData();
    const items = local[collectionName] || [];
    return items.find(item => item.id === id) || null;
  },

  // Create document
  async createDoc(collectionName, data) {
    const id = data.id || `${collectionName.slice(0, 3)}-${Date.now()}`;
    const newDoc = { ...data, id };

    if (dbMode === 'firebase' && firestore) {
      try {
        await firestore.collection(collectionName).doc(id).set(newDoc);
        return newDoc;
      } catch (err) {
        console.error(`Firebase createDoc error on ${collectionName}:`, err.message);
      }
    }

    const local = readLocalData();
    if (!local[collectionName]) local[collectionName] = [];
    local[collectionName].push(newDoc);
    writeLocalData(local);
    return newDoc;
  },

  // Update document
  async updateDoc(collectionName, id, updates) {
    if (dbMode === 'firebase' && firestore) {
      try {
        await firestore.collection(collectionName).doc(id).update(updates);
        return { id, ...updates };
      } catch (err) {
        console.error(`Firebase updateDoc error on ${collectionName}/${id}:`, err.message);
      }
    }

    const local = readLocalData();
    const items = local[collectionName] || [];
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;

    local[collectionName][index] = { ...items[index], ...updates };
    writeLocalData(local);
    return local[collectionName][index];
  },

  // Delete document
  async deleteDoc(collectionName, id) {
    if (dbMode === 'firebase' && firestore) {
      try {
        await firestore.collection(collectionName).doc(id).delete();
        return true;
      } catch (err) {
        console.error(`Firebase deleteDoc error on ${collectionName}/${id}:`, err.message);
      }
    }

    const local = readLocalData();
    const items = local[collectionName] || [];
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length === items.length) return false;

    local[collectionName] = filtered;
    writeLocalData(local);
    return true;
  },

  // Wedding Profile (single config object)
  async getWeddingProfile() {
    if (dbMode === 'firebase' && firestore) {
      try {
        const docRef = await firestore.collection('settings').doc('wedding').get();
        if (docRef.exists) return docRef.data();
      } catch (err) {
        console.warn('Firebase wedding profile error:', err.message);
      }
    }
    const local = readLocalData();
    return local.wedding || {};
  },

  async updateWeddingProfile(profile) {
    if (dbMode === 'firebase' && firestore) {
      try {
        await firestore.collection('settings').doc('wedding').set(profile, { merge: true });
        return profile;
      } catch (err) {
        console.warn('Firebase wedding profile update error:', err.message);
      }
    }
    const local = readLocalData();
    local.wedding = { ...local.wedding, ...profile };
    writeLocalData(local);
    return local.wedding;
  }
};

// Initialize on module load
initFirebase();

module.exports = dbService;
