# Test Case Specification — Version 2.0 (Intelligence & Coordination)

**Product:** Heritage & Harmony — Cross-Cultural Wedding Planner  
**Tier:** Version 2.0 (Intelligence & Coordination)  
**Base Endpoint:** `http://localhost:5000/api/v2`  
**Execution Command:** `npm run test:v2` (inside `wedding/server`)

---

## 1. Overview & Scope
Version 2.0 introduces the platform's core algorithmic differentiator and identity layer:
- Server-side AI Wedding Concierge curation engine
- Dual-protocol timeline synthesis (detecting cross-cultural vs traditional unions)
- Harmonized decor palettes, fusion gastronomy menus, and couture direction
- Persistent curation boards with shareable IDs (`shareId`)
- User & Couple account registration with bcrypt password hashing
- Secure JWT token generation and authentication
- Protected profile route access with Bearer authorization

---

## 2. Test Case Matrix

| Test ID | Test Name | Endpoint | Method | Expected Status | Validation Criteria |
|---|---|---|---|---|---|
| **TC-V2-001** | Version 2.0 Health Telemetry | `/api/v2/health` | `GET` | `200 OK` | `version: "2.0.0"`, `tier: "Intelligence & Coordination"`, lists v2 endpoints |
| **TC-V2-002** | Cross-Cultural Fusion Synthesis | `/api/v2/curation/generate` | `POST` | `201 Created` | Detects `isFusion: true`, generates dual ceremony timeline, palette harmony & menus |
| **TC-V2-003** | Traditional Single-Culture Plan | `/api/v2/curation/generate` | `POST` | `201 Created` | Detects `isFusion: false`, generates authentic deep-protocol single tradition plan |
| **TC-V2-004** | Curation Validation Error | `/api/v2/curation/generate` | `POST` | `400 Bad Request` | Rejects payload missing bride or groom profile |
| **TC-V2-005** | Retrieve Board by Share ID | `/api/v2/curation/:id` | `GET` | `200 OK` | Fetches persisted board matching `shareId` |
| **TC-V2-006** | Register Couple User | `/api/v2/auth/register` | `POST` | `201 Created` | Hashes password with bcrypt, stores user, issues JWT access token |
| **TC-V2-007** | Duplicate Email Blocked | `/api/v2/auth/register` | `POST` | `400 Bad Request` | Blocks re-registering an existing email address |
| **TC-V2-008** | Login with Valid Credentials | `/api/v2/auth/login` | `POST` | `200 OK` | Verifies password against hash, returns signed JWT token |
| **TC-V2-009** | Login with Invalid Password | `/api/v2/auth/login` | `POST` | `401 Unauthorized` | Rejects incorrect password with `"Invalid credentials"` |
| **TC-V2-010** | Protected Profile Access | `/api/v2/auth/me` | `GET` | `200 OK` | Validates `Bearer <token>` and returns user profile without password |
| **TC-V2-011** | Protected Access Without Token | `/api/v2/auth/me` | `GET` | `401 Unauthorized` | Rejects missing authorization header |

---

## 3. Detailed Test Specifications

### TC-V2-002: Cross-Cultural Fusion Plan Synthesis
- **Description:** Submits bride (Tamil Hindu) and groom (Punjabi Sikh) profiles to verify automatic dual-protocol generation.
- **Request:**
  ```http
  POST /api/v2/curation/generate HTTP/1.1
  Host: localhost:5000
  Content-Type: application/json

  {
    "bride": { "religion": "Hindu", "community": "Tamil", "state": "Tamil Nadu", "language": "Tamil" },
    "groom": { "religion": "Sikh", "community": "Punjabi", "state": "Punjab", "language": "Punjabi" },
    "prefs": {
      "budget": "₹1–3 Cr (Luxury)",
      "guests": "250–500",
      "venue": "Heritage Palace",
      "decor": "Jasmine & Lotus",
      "food": "Fusion"
    }
  }
  ```
- **Validation Criteria:**
  - `data.shareId` is generated
  - `data.curation.isFusion` is `true`
  - `data.curation.ceremony.timeline` contains discrete Tamil Muhurtham and Punjabi Anand Karaj timings
  - `data.curation.decor.palette` combines palettes from both traditions
  - `data.curation.invite.title` references dual-script invitation suites

---

### TC-V2-006: User Registration & JWT Issuance
- **Description:** Verifies secure account creation for couples.
- **Request:**
  ```http
  POST /api/v2/auth/register HTTP/1.1
  Host: localhost:5000
  Content-Type: application/json

  {
    "name": "Rohan & Meera",
    "email": "rohan.meera@example.com",
    "password": "SecurePassword@123",
    "role": "couple",
    "partnerName": "Meera",
    "traditions": ["Punjabi", "Tamil"]
  }
  ```
- **Expected Response:** `201 Created`
  - Returns `token` (JWT signed string)
  - Returns user profile excluding password hash

---

## 4. Test Execution Summary
- **Total Test Cases:** 11
- **Automated Runner File:** `wedding/server/tests/test_v2.js`
- **Execution Result:** 11 Passed, 0 Failed (100% Pass Rate)
