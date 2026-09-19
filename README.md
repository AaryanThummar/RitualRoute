# 🕊️ RitualRoute - Cross-Cultural & Interfaith Wedding Planning Platform

**RitualRoute** is a comprehensive, luxury full-stack wedding planning web application specialized in cross-cultural and multicultural weddings (Hindu, Sikh, Christian, Muslim, Jewish, and Interfaith blends).

It harmonizes diverse cultural ceremonies, manages multi-event RSVPs and dietary needs, tracks budgets with payment milestones, offers a specialized cultural vendor directory, and provides an etiquette guide for guests.

---

## ✨ Features

- **Cross-Cultural Ritual Harmonizer**:
  - Automatically merges ceremonies from two different traditions (e.g. Hindu + Sikh, Christian + Hindu, Muslim + Hindu) into a harmonious multi-day schedule.
  - Highlights cultural synergies, suggested attire per ceremony, and guest etiquette.
- **Traditions & Ceremonies Encyclopedia**:
  - In-depth guide to rituals including significance, required items/samagri, dress codes, and dos & don'ts.
- **Multi-Ceremony Guest & RSVP Management**:
  - Tracks attendance per specific ritual (Haldi, Sangeet, Nuptials, Reception).
  - Dietary tracking for strict dietary needs (Jain, Halal, Kosher, Vegetarian, Vegan, Allergies).
  - Side allocation (Bride's family, Groom's family, Mutual friends).
- **Budget & Payment Milestones Tracker**:
  - Category breakdown (Venue, Catering, Decor, Photography, Attire, Music).
  - Visual budget meter and payment status tracking (Paid, Partial, Pending).
- **Specialized Cultural Vendor Directory**:
  - Bilingual officiants/priests/qazis, fusion caterers with segregated kitchens, dhol drummers, and henna artists.
- **Cultural Companion for Guests**:
  - Shareable etiquette guide explaining auspicious colors, traditional gifts (Shagun), and ceremony customs.
- **Dual-Mode Database (Firebase Firestore + Zero-Crash Fallback)**:
  - Real-time cloud persistence with **Firebase Firestore**.
  - Automatically activates local JSON engine (`data/db.json`) if Firebase credentials are not yet entered in `.env`, ensuring zero downtime.

---

## 🚀 Technology Stack

- **Backend**: Node.js, Express.js, Firebase Admin SDK, CORS, Dotenv
- **Frontend**: Vanilla HTML5, Modern CSS3 with Custom Properties & Glassmorphism, Vanilla ES6+ JavaScript
- **Database**: Google Cloud Firebase Firestore (with local JSON fallback)
- **Deployment**: Render Cloud Web Service (`render.yaml`)

---

## 🛠️ Local Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AaryanThummar/RitualRoute.git
   cd RitualRoute
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   *(Note: The app will run immediately in Local Database mode even if `.env` is empty!)*

4. **Start the Server**:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔥 Connecting to Firebase Firestore

To connect your real Firebase project:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a project and create a **Firestore Database** in production mode.
3. Go to **Project Settings > Service accounts** and click **Generate new private key**.
4. Open your `.env` file and add the credentials:
   ```env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project-id.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBA...your...key...\n-----END PRIVATE KEY-----\n"
   ```
   *Alternatively, save the downloaded JSON file as `firebase-service-account.json` in the project root.*
5. Restart your server. The status badge in the navbar will turn green: `🟢 Firebase Firestore`.

---

## 🌐 Deploying to Render

This repository includes a pre-configured `render.yaml` blueprint for 1-click deployment on [Render](https://render.com).

### Method 1: Git-Backed Auto-Deploy (Recommended)
1. Push this repository to GitHub: `https://github.com/AaryanThummar/RitualRoute.git`.
2. Log in to [Render](https://dashboard.render.com).
3. Click **New + > Web Service**.
4. Connect your GitHub repository `AaryanThummar/RitualRoute`.
5. Configure:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `FIREBASE_PROJECT_ID`: *(Optional)* Your Firebase project ID
   - `FIREBASE_CLIENT_EMAIL`: *(Optional)* Your Firebase client email
   - `FIREBASE_PRIVATE_KEY`: *(Optional)* Your Firebase private key
7. Click **Create Web Service**. Your website is now live!

### Method 2: Render Blueprint (`render.yaml`)
1. In the Render Dashboard, click **New + > Blueprint**.
2. Select `AaryanThummar/RitualRoute`. Render will automatically read `render.yaml` and set up the Web Service.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/system/status` | System health and Firebase connection status |
| `GET` | `/api/rituals` | Get all wedding traditions (supports `?culture=Hindu`) |
| `POST` | `/api/rituals` | Add a custom ritual |
| `POST` | `/api/harmonizer/blend` | Generate cross-cultural harmonized itinerary |
| `GET` | `/api/guests` | List all guests (supports `?side=Bride`, `?rsvp=Confirmed`) |
| `GET` | `/api/guests/stats` | Headcount and dietary analytics |
| `POST` | `/api/guests` | Add new guest with multi-ceremony attendance |
| `DELETE`| `/api/guests/:id` | Remove a guest |
| `GET` | `/api/budget` | List all budget expenses |
| `GET` | `/api/budget/summary` | Financial summary & category progress |
| `POST` | `/api/budget` | Log new expense |
| `GET` | `/api/vendors` | List cultural vendors |
| `GET` | `/api/tasks` | Get countdown checklist items |
| `PUT` | `/api/tasks/:id` | Toggle task completion |

---

## 👥 Contributors

- **Aaryan Thumar** (Scrum Master & Backend Architecture)
- **Hetvi Gajera** (UI/UX Design)
- **Dev Pansuriya** (Systems & Automation)
- **Mahek Somaya** (Communications)
- **Saanvi Ghadiali** (Logistics & Coordination)
- **Smeet Savla** (Testing & Verification)

---

## 📄 License

This project is licensed under the MIT License.
