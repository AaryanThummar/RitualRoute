# Heritage & Harmony — Cross-Cultural Wedding Planner Backend API

Backend REST API engine built with **Node.js, Express, and MongoDB/Mongoose**, designed specifically to power the Heritage & Harmony Cross-Cultural Wedding Planning platform.

---

## 🚀 Quick Start

### 1. Requirements
- Node.js (v18+)
- MongoDB (running locally on port `27017` or configured via `MONGO_URI`)

### 2. Environment Configuration
Verify `.env` in `wedding/server`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/wedding_planner
JWT_SECRET=heritage_harmony_super_secret_jwt_key_2026
CLIENT_URL=http://localhost:5173
```

### 3. Seed Database (Optional / Recommended)
Pre-populate the database with authentic cultural traditions, services, sample inquiries, and demo curation boards:
```bash
npm run seed
```

### 4. Start Server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will start at `http://localhost:5000`.

---

## 📡 API Endpoints

### 🩺 Health & System
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service uptime and MongoDB connectivity status |
| `GET` | `/api` | Interactive API portal and route documentation |

---

### 💌 Contact & Inquiries
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/inquiries` | Submit new inquiry from the contact form |
| `GET` | `/api/inquiries` | List all inquiries (supports `?status=New`) |
| `GET` | `/api/inquiries/:id` | Fetch specific inquiry |
| `PATCH`| `/api/inquiries/:id` | Update inquiry status or internal notes |
| `DELETE`| `/api/inquiries/:id`| Remove inquiry (Admin only) |

#### Sample Inquiry Payload (`POST /api/inquiries`):
```json
{
  "name": "Priya Sharma & Liam Smith",
  "email": "priya.liam@example.com",
  "tradition": "Punjabi Hindu + Irish Celtic",
  "message": "We are seeking consultation for dual-ceremony choreography in Udaipur."
}
```

---

### 🧠 AI Wedding Concierge & Curation Board
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/curation/generate` | Synthesizes an 8-module cross-cultural wedding plan & stores it |
| `GET` | `/api/curation` | List all public curation boards |
| `GET` | `/api/curation/:id` | Retrieve board by ID or `shareId` |

#### Sample Generation Payload (`POST /api/curation/generate`):
```json
{
  "bride": {
    "religion": "Hindu",
    "community": "Punjabi",
    "state": "Delhi",
    "language": "Punjabi"
  },
  "groom": {
    "religion": "Hindu",
    "community": "Tamil",
    "state": "Tamil Nadu",
    "language": "Tamil"
  },
  "prefs": {
    "budget": "₹1–3 Cr (Luxury)",
    "guests": "250–500",
    "venue": "Heritage Palace",
    "decor": "Marigold & Lotus",
    "food": "Traditional + Fusion Buffet"
  }
}
```

---

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register couple or admin account |
| `POST` | `/api/auth/login` | Login and receive JWT access token |
| `GET` | `/api/auth/me` | Fetch authenticated user profile |

---

### 👥 Guests & RSVP Management (`/api/guests`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/guests` | List all guests (supports `?side=Bride` or `?status=Confirmed`) |
| `POST` | `/api/guests` | Add new guest / RSVP |
| `PUT` | `/api/guests/:id` | Update guest attendance or dietary preferences |
| `DELETE`| `/api/guests/:id` | Remove guest |

---

### 💰 Smart Budget Tracker (`/api/budget`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/budget` | Get budget items, total allocated, and total spent |
| `POST` | `/api/budget` | Add new budget allocation item |
| `PUT` | `/api/budget/:id` | Update allocation or mark paid |
| `DELETE`| `/api/budget/:id` | Delete budget item |

---

### 📋 Multi-Ceremony Checklist (`/api/checklist`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/checklist` | Get milestone tasks (supports `?completed=true`) |
| `POST` | `/api/checklist` | Add planning task |
| `PUT` | `/api/checklist/:id` | Toggle completion or update task |
| `DELETE`| `/api/checklist/:id` | Remove task |

---

### 🕊️ Traditions, Services & Destinations
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/traditions` | Regional cultural rituals and protocol specifications |
| `GET` | `/api/services` | Service catalog matching the website atelier |
| `GET` | `/api/destinations` | Luxury destination details & venues |
