# GitHub Team Collaboration, Role Allocation & Multi-Version Testing Guide
**Project:** RitualRoute (Heritage & Harmony — Cross-Cultural Wedding Planner)  
**Official GitHub Repository:** [`https://github.com/AaryanThummar/RitualRoute`](https://github.com/AaryanThummar/RitualRoute)  
**Git Remote URL:** `https://github.com/AaryanThummar/RitualRoute.git`  
**Repository Owner:** Aaryan Thumar (`@AaryanThummar`)  
**Document Version:** 2.0.0 (Updated with verified GitHub Team & Remote Specs)  

---

## 👥 1. Team Roster & Role Allocation Matrix

| Team Member | GitHub Username | Access Status | Official Project Role | Modules & Files Owned | Working Feature Branch |
|---|---|:---:|---|---|---|
| **Aaryan Thumar** | [`@AaryanThummar`](https://github.com/AaryanThummar) | **Owner** | **Project Owner / Scrum Master / System Architect** | • Repository governance & settings<br>• `.gitignore`, Root README, License<br>• Architecture blueprints & ADRs<br>• Release gating, PR approvals & CI/CD | `arch/system-orchestration`<br>`release/v3.0` |
| **Dev Pansuriya** | [`@devpansuriya`](https://github.com/devpansuriya) | **Collaborator** | **System Architect / Backend Developer** | • `wedding/server/index.js`<br>• `wedding/server/controllers/curationController.js`<br>• `wedding/server/routes/curationRoutes.js`<br>• Gateway middleware & version routing | `feature/ai-curation-engine`<br>`feature/api-gateway` |
| **Hetvi Gajera** | [`@hetviigajeraa`](https://github.com/hetviigajeraa) | **Pending Invite** *(Needs to accept)* | **UI/UX Designer** | • `client-old/src/*` (or `wedding/client`)<br>• UI styling (`index.css`, glassmorphism cards)<br>• AI Board visualization & RSVP modals<br>• Design tokens (Royal Ivory, Burgundy & Gold) | `design/luxury-theme`<br>`design/client-ui` |
| **Mahek Somaiya** | [`@maheksomaiya2-commits`](https://github.com/maheksomaiya2-commits) | **Collaborator** | **Communication Lead** | • `wedding/server/controllers/contentController.js`<br>• `wedding/server/controllers/inquiryController.js`<br>• `wedding/server/routes/inquiryRoutes.js`<br>• Cultural rituals catalog (`traditions.json`), venues, PR copy | `docs/traditions-catalog`<br>`feature/inquiries-crm` |
| **Sanvi Ghadiali** | [`@saanvighadiali1086`](https://github.com/saanvighadiali1086) | **Collaborator** | **Backend Developer / Tester** | • `wedding/server/tests/*` (all 4 test files)<br>• `TEST_CASES_V1.md`, `V2.md`, `V3.md`<br>• `wedding/server/controllers/authController.js`<br>• `wedding/server/controllers/guestController.js` | `test/qa-automation-suite`<br>`feature/auth-and-guests` |
| **Smeet Savla** | [`@smeetsavla`](https://github.com/smeetsavla) | **Pending Invite** *(Needs to accept)* | **Database Designer / Backend Developer** | • `wedding/server/config/db.js`<br>• `wedding/server/models/*` (all 7 models)<br>• `wedding/server/scripts/seed.js`<br>• `wedding/server/data/*` & fallback caching | `feature/db-schemas-and-models`<br>`feature/db-seeders` |

> [!NOTE]
> **Action Required for Pending Invites:**
> - **Hetvi Gajera** ([`@hetviigajeraa`](https://github.com/hetviigajeraa)) and **Smeet Savla** ([`@smeetsavla`](https://github.com/smeetsavla)) should log in to GitHub, check their email or visit [`https://github.com/AaryanThummar/RitualRoute`](https://github.com/AaryanThummar/RitualRoute) to click **"Accept invitation"** to unlock direct push permissions to their feature branches.

---

## 🛠️ 2. How to Push the Local Codebase to GitHub (`RitualRoute`)

The repository `AaryanThummar/RitualRoute` is already created as a public repository on GitHub, and collaborators have direct access.

Follow these exact steps from your computer to push all local branches (`v1.0-core-foundation`, `v2.0-ai-curation-auth`, and `v3.0-full-wedding-management`):

### Step 2.1: Open PowerShell in Project Root
```powershell
cd "c:\Users\Depanshi\OneDrive\Desktop\Cross Cultural Wedding Planner\Cross Cultural Wedding Planner"
```

### Step 2.2: Link Remote Repository (`RitualRoute`)
Check if a remote is already configured, then add or update the `origin` URL:
```powershell
# Check current remotes:
git remote -v

# If no remote is configured, add origin:
git remote add origin https://github.com/AaryanThummar/RitualRoute.git

# If origin already exists pointing elsewhere, update it:
git remote set-url origin https://github.com/AaryanThummar/RitualRoute.git
```

### Step 2.3: Push All 3 Version Branches to `RitualRoute`
Push the 3 version branches to the remote repository:
```powershell
# 1. Push Version 1.0 (Core Foundation / MVP)
git push -u origin v1.0-core-foundation

# 2. Push Version 2.0 (AI Curation & Auth)
git push -u origin v2.0-ai-curation-auth

# 3. Push Version 3.0 (Enterprise Wedding Management)
git push -u origin v3.0-full-wedding-management
```

*(Alternatively, to push all local branches at once):*
```powershell
git push -u origin --all
```

---

### Step 2.4: Set Default Branch & Protection on GitHub
On [`https://github.com/AaryanThummar/RitualRoute`](https://github.com/AaryanThummar/RitualRoute):
1. Navigate to **Settings** &rarr; **Branches**.
2. Click the switch icon next to the default branch &rarr; Select **`v3.0-full-wedding-management`** &rarr; Click **Update**.
3. Under **Branch protection rules**, click **Add branch ruleset** (or **Add rule**):
   - **Branch name pattern:** `v*` (protects `v1.0-*`, `v2.0-*`, `v3.0-*`).
   - Check: **Require a pull request before merging** (Require 1 review approval).
   - Check: **Require status checks to pass before merging** (`npm test`).
   - Check: **Do not allow bypassing the above settings**.

---

## 🔄 3. Team Member Daily Git Workflow

Every team member clones the official repository, creates their feature branch, writes code, tests locally, and opens a Pull Request on GitHub:

```
[Remote: AaryanThummar/RitualRoute (v3.0-full-wedding-management)]
       │
       ├── git clone https://github.com/AaryanThummar/RitualRoute.git
       │
       ├── git checkout -b feature/your-task-name
       │        (Dev, Hetvi, Mahek, Sanvi, Smeet work locally)
       │
       ├── git commit -m "feat(...): clear commit message"
       │
       ├── git push origin feature/your-task-name
       │
       └── GitHub PR on RitualRoute ──> Code Review & Tests Passed ──> Merge into v3.0
```

### Member-by-Member Command Cheatsheet:

#### 1. Dev Pansuriya ([`@devpansuriya`](https://github.com/devpansuriya)) — AI Engine & Routing
```powershell
git clone https://github.com/AaryanThummar/RitualRoute.git
cd RitualRoute
git checkout v3.0-full-wedding-management
git checkout -b feature/ai-curation-enhancements

# Edit curationController.js & curationRoutes.js
git add wedding/server/controllers/curationController.js wedding/server/routes/curationRoutes.js
git commit -m "feat(curation): harmonize multi-day cross-cultural ritual schedules"
git push -u origin feature/ai-curation-enhancements
# Open PR -> Request review from @saanvighadiali1086 & @AaryanThummar
```

#### 2. Hetvi Gajera ([`@hetviigajeraa`](https://github.com/hetviigajeraa)) — UI/UX Design System
```powershell
git clone https://github.com/AaryanThummar/RitualRoute.git
cd RitualRoute
git checkout v3.0-full-wedding-management
git checkout -b design/luxury-theme-system

# Edit UI components and styling
git add client-old/
git commit -m "style(ui): implement royal ivory and burgundy palette with glassmorphism"
git push -u origin design/luxury-theme-system
# Open PR -> Request review from @maheksomaiya2-commits & @AaryanThummar
```

#### 3. Mahek Somaiya ([`@maheksomaiya2-commits`](https://github.com/maheksomaiya2-commits)) — Traditions & Client Communications
```powershell
git clone https://github.com/AaryanThummar/RitualRoute.git
cd RitualRoute
git checkout v3.0-full-wedding-management
git checkout -b docs/traditions-and-venues-catalog

# Edit traditions catalog and inquiry handlers
git add wedding/server/data/ wedding/server/controllers/contentController.js
git commit -m "content(traditions): add South Indian & Punjabi sangeet ceremonial notes"
git push -u origin docs/traditions-and-venues-catalog
# Open PR -> Request review from @hetviigajeraa & @AaryanThummar
```

#### 4. Sanvi Ghadiali ([`@saanvighadiali1086`](https://github.com/saanvighadiali1086)) — Test Engineering & Auth
```powershell
git clone https://github.com/AaryanThummar/RitualRoute.git
cd RitualRoute
git checkout v3.0-full-wedding-management
git checkout -b test/qa-regression-v3

# Run test suite to verify baseline
cd wedding/server
npm test
cd ../..

# Edit tests or auth validation
git add wedding/server/tests/ TEST_CASES_V*.md wedding/server/controllers/authController.js
git commit -m "test(qa): add edge case tests for JWT token expiry and budget variances"
git push -u origin test/qa-regression-v3
# Open PR -> Request review from @devpansuriya & @AaryanThummar
```

#### 5. Smeet Savla ([`@smeetsavla`](https://github.com/smeetsavla)) — Database Models & Data Seeders
```powershell
git clone https://github.com/AaryanThummar/RitualRoute.git
cd RitualRoute
git checkout v3.0-full-wedding-management
git checkout -b feature/database-optimization

# Edit schemas, seed scripts, and db connector
git add wedding/server/models/ wedding/server/config/db.js wedding/server/scripts/seed.js
git commit -m "feat(db): optimize RSVP query index and update in-memory cache fallback"
git push -u origin feature/database-optimization
# Open PR -> Request review from @devpansuriya & @AaryanThummar
```

#### 6. Aaryan Thumar ([`@AaryanThummar`](https://github.com/AaryanThummar)) — Project Owner & Merges
- Reviews every PR opened against `v3.0-full-wedding-management`.
- Checks that the 32 automated tests pass (`npm test`).
- Merges approved PRs into `v3.0-full-wedding-management`.
- Creates official semantic version tags:
  ```powershell
  git tag -a v3.0.0 -m "Release v3.0.0 — Enterprise Multi-Cultural Wedding Suite"
  git push origin --tags
  ```

---

## 🏛️ 4. The 3 Versions (3 V's) Architecture Breakdown

```
RitualRoute Version Hierarchy
=======================================================================
[Version 1.0] Core Foundation (MVP)
  │  Branch: v1.0-core-foundation
  │  Features: Inquiries CRM, Regional Traditions Catalog, Luxury Services,
  │            Royal Venues, System Health Telemetry.
  │  Tests: 10 Automated Integration Tests (TC-V1-001 to TC-V1-010)
  │
  ▼
[Version 2.0] Intelligence & Coordination
  │  Branch: v2.0-ai-curation-auth
  │  Features: AI Concierge Curation Engine (Cross-cultural fusion detection,
  │            dual-ceremony timeline synthesis, color harmony, gastronomy),
  │            JWT/Bcrypt Couple Auth, Persistent Board with shareId.
  │  Tests: 11 Automated Integration Tests (TC-V2-001 to TC-V2-011)
  │
  ▼
[Version 3.0] Enterprise Wedding Management
     Branch: v3.0-full-wedding-management (Default)
     Features: Multi-Cultural Guest & RSVP Ledger, Dual-Tradition Smart
               Budget Calculator, Multi-Ceremony Milestone Checklist,
               End-to-End full lifecycle orchestration.
     Tests: 11 Automated Integration Tests (TC-V3-001 to TC-V3-011)
            + 32/32 Cumulative Tests Executed Sequentially
```

---

## 🧪 5. All Three Test Suites & Verified Test Results

### 5.1 Version 1.0 Test Suite (Core Foundation)
- **Base Endpoint:** `http://localhost:5000/api/v1`
- **Execution Command:** `npm run test:v1` (inside `wedding/server`)

| Test ID | Test Name | Endpoint | Method | Expected Status | Result |
|---|---|---|---|---|:---:|
| **TC-V1-001** | System Health Telemetry | `/api/v1/health` | `GET` | `200 OK`, `version: "1.0.0"`, status online | ✅ **PASSED** |
| **TC-V1-002** | Traditions Catalog Retrieval | `/api/v1/traditions` | `GET` | `200 OK`, Array with cultural rituals | ✅ **PASSED** |
| **TC-V1-003** | Services Atelier Catalog | `/api/v1/services` | `GET` | `200 OK`, Exactly 9 luxury services | ✅ **PASSED** |
| **TC-V1-004** | Destination Venues Retrieval | `/api/v1/destinations` | `GET` | `200 OK`, 4 Royal destination venues | ✅ **PASSED** |
| **TC-V1-005** | Submit Valid Contact Inquiry | `/api/v1/inquiries` | `POST` | `201 Created`, DB record saved | ✅ **PASSED** |
| **TC-V1-006** | Inquiry Missing Required Fields | `/api/v1/inquiries` | `POST` | `400 Bad Request`, validation message | ✅ **PASSED** |
| **TC-V1-007** | List All Inquiries | `/api/v1/inquiries` | `GET` | `200 OK`, Array of inquiry records | ✅ **PASSED** |
| **TC-V1-008** | Fetch Inquiry by Identifier | `/api/v1/inquiries/:id` | `GET` | `200 OK`, Single inquiry record | ✅ **PASSED** |
| **TC-V1-009** | Update Inquiry Status | `/api/v1/inquiries/:id` | `PATCH` | `200 OK`, status updated to Scheduled | ✅ **PASSED** |
| **TC-V1-010** | Filter Inquiries by Status | `/api/v1/inquiries?status=...` | `GET` | `200 OK`, filtered records matching status | ✅ **PASSED** |

**Version 1.0 Summary:** **10 Passed / 0 Failed (100% Pass Rate)**

---

### 5.2 Version 2.0 Test Suite (AI Curation & Auth)
- **Base Endpoint:** `http://localhost:5000/api/v2`
- **Execution Command:** `npm run test:v2` (inside `wedding/server`)

| Test ID | Test Name | Endpoint | Method | Expected Status | Result |
|---|---|---|---|---|:---:|
| **TC-V2-001** | Version 2.0 Health Telemetry | `/api/v2/health` | `GET` | `200 OK`, `version: "2.0.0"`, tier metadata | ✅ **PASSED** |
| **TC-V2-002** | Cross-Cultural Fusion Synthesis | `/api/v2/curation/generate` | `POST` | `201 Created`, `isFusion: true`, dual timeline | ✅ **PASSED** |
| **TC-V2-003** | Traditional Single-Culture Plan | `/api/v2/curation/generate` | `POST` | `201 Created`, `isFusion: false`, authentic plan | ✅ **PASSED** |
| **TC-V2-004** | Curation Validation Error | `/api/v2/curation/generate` | `POST` | `400 Bad Request`, rejects missing bride/groom | ✅ **PASSED** |
| **TC-V2-005** | Retrieve Board by Share ID | `/api/v2/curation/:id` | `GET` | `200 OK`, Returns persisted board | ✅ **PASSED** |
| **TC-V2-006** | Register Couple User | `/api/v2/auth/register` | `POST` | `201 Created`, Bcrypt hashed, JWT issued | ✅ **PASSED** |
| **TC-V2-007** | Duplicate Email Blocked | `/api/v2/auth/register` | `POST` | `400 Bad Request`, duplicate rejected | ✅ **PASSED** |
| **TC-V2-008** | Login with Valid Credentials | `/api/v2/auth/login` | `POST` | `200 OK`, returns valid signed JWT | ✅ **PASSED** |
| **TC-V2-009** | Login with Invalid Password | `/api/v2/auth/login` | `POST` | `401 Unauthorized`, error returned | ✅ **PASSED** |
| **TC-V2-010** | Protected Profile Access | `/api/v2/auth/me` | `GET` | `200 OK`, Authenticated with Bearer token | ✅ **PASSED** |
| **TC-V2-011** | Protected Access Without Token | `/api/v2/auth/me` | `GET` | `401 Unauthorized`, header missing rejected | ✅ **PASSED** |

**Version 2.0 Summary:** **11 Passed / 0 Failed (100% Pass Rate)**

---

### 5.3 Version 3.0 Test Suite (Enterprise Wedding Management)
- **Base Endpoint:** `http://localhost:5000/api/v3`
- **Execution Command:** `npm run test:v3` (inside `wedding/server`)

| Test ID | Test Name | Endpoint | Method | Expected Status | Result |
|---|---|---|---|---|:---:|
| **TC-V3-001** | Version 3.0 Health Telemetry | `/api/v3/health` | `GET` | `200 OK`, `version: "3.0.0"`, tier metadata | ✅ **PASSED** |
| **TC-V3-002** | Create Guest with Cultural Tags | `/api/v3/guests` | `POST` | `201 Created`, Side: Bride, Culture: Punjabi | ✅ **PASSED** |
| **TC-V3-003** | Filter Guests by Family Side | `/api/v3/guests?side=Bride` | `GET` | `200 OK`, Only Bride side guests returned | ✅ **PASSED** |
| **TC-V3-004** | Confirm Guest RSVP Attendance | `/api/v3/guests/:id` | `PUT` | `200 OK`, status updated to Confirmed | ✅ **PASSED** |
| **TC-V3-005** | Create Budget Allocation | `/api/v3/budget` | `POST` | `201 Created`, Dual-tradition expense saved | ✅ **PASSED** |
| **TC-V3-006** | Mathematical Budget Calculation | `/api/v3/budget` | `GET` | `200 OK`, Accurate totalAllocated & balance | ✅ **PASSED** |
| **TC-V3-007** | Mark Expense as Paid | `/api/v3/budget/:id` | `PUT` | `200 OK`, `paid: true` updated | ✅ **PASSED** |
| **TC-V3-008** | Create Multi-Ceremony Task | `/api/v3/checklist` | `POST` | `201 Created`, Task with ceremonyTag saved | ✅ **PASSED** |
| **TC-V3-009** | Toggle Task Completion | `/api/v3/checklist/:id` | `PUT` | `200 OK`, `completed: true` updated | ✅ **PASSED** |
| **TC-V3-010** | Filter Finished Milestones | `/api/v3/checklist?completed=true` | `GET` | `200 OK`, Returns only completed tasks | ✅ **PASSED** |
| **TC-V3-011** | Full End-to-End Lifecycle Flow | Multiple | Mixed | `200/201 OK`, Inquiry &rarr; Board &rarr; RSVP &rarr; Budget &rarr; Task &rarr; Clean | ✅ **PASSED** |

**Version 3.0 Summary:** **11 Passed / 0 Failed (100% Pass Rate)**

---

### 5.4 Master Test Suite Execution Log (Live Verification Output)

Command executed:
```powershell
cd wedding/server
npm test
```

**Live Output:**
```text
======================================================
 🚀 HERITAGE & HARMONY: COMPLETE MULTI-VERSION TEST RUNNER
 Executing Version 1.0, Version 2.0, and Version 3.0
======================================================

======================================================
 🧪 RUNNING TEST SUITE: VERSION 1.0 (Core Foundation)
 🌐 Base URL: http://localhost:5000/api/v1
======================================================

  • [v1.0] TC-V1-001: Health Check returns v1.0.0 metadata... ✅ PASSED
  • [v1.0] TC-V1-002: GET /traditions returns cultural rituals... ✅ PASSED
  • [v1.0] TC-V1-003: GET /services returns atelier service catalog... ✅ PASSED
  • [v1.0] TC-V1-004: GET /destinations returns royal destination venues... ✅ PASSED
  • [v1.0] TC-V1-005: POST /inquiries saves lead inquiry... ✅ PASSED
  • [v1.0] TC-V1-006: POST /inquiries rejects missing name/email with 400... ✅ PASSED
  • [v1.0] TC-V1-007: GET /inquiries returns inquiry list... ✅ PASSED
  • [v1.0] TC-V1-008: GET /inquiries/:id retrieves specific inquiry... ✅ PASSED
  • [v1.0] TC-V1-009: PATCH /inquiries/:id updates consultation status... ✅ PASSED
  • [v1.0] TC-V1-010: GET /inquiries?status=Consultation+Scheduled filters list... ✅ PASSED

------------------------------------------------------
 📊 v1.0 SUMMARY: Passed: 10 | Failed: 0 | Total: 10
------------------------------------------------------

======================================================
 🧪 RUNNING TEST SUITE: VERSION 2.0 (AI Curation & Auth)
 🌐 Base URL: http://localhost:5000/api/v2
======================================================

  • [v2.0] TC-V2-001: Health Check returns v2.0.0 metadata... ✅ PASSED
  • [v2.0] TC-V2-002: POST /curation/generate synthesizes dual-protocol fusion plan... ✅ PASSED
  • [v2.0] TC-V2-003: POST /curation/generate generates pure traditional plan when traditions match... ✅ PASSED
  • [v2.0] TC-V2-004: POST /curation/generate rejects missing bride or groom with 400... ✅ PASSED
  • [v2.0] TC-V2-005: GET /curation/:id retrieves persisted board... ✅ PASSED
  • [v2.0] TC-V2-006: POST /auth/register creates couple account & issues JWT... ✅ PASSED
  • [v2.0] TC-V2-007: POST /auth/register rejects duplicate email with 400... ✅ PASSED
  • [v2.0] TC-V2-008: POST /auth/login authenticates user & returns JWT... ✅ PASSED
  • [v2.0] TC-V2-009: POST /auth/login rejects wrong password with 401... ✅ PASSED
  • [v2.0] TC-V2-010: GET /auth/me returns authenticated user profile... ✅ PASSED
  • [v2.0] TC-V2-011: GET /auth/me rejects missing token with 401... ✅ PASSED

------------------------------------------------------
 📊 v2.0 SUMMARY: Passed: 11 | Failed: 0 | Total: 11
------------------------------------------------------

======================================================
 🧪 RUNNING TEST SUITE: VERSION 3.0 (Full Management)
 🌐 Base URL: http://localhost:5000/api/v3
======================================================

  • [v3.0] TC-V3-001: Health Check returns v3.0.0 metadata... ✅ PASSED
  • [v3.0] TC-V3-002: POST /guests creates RSVP with dietary & culture tag... ✅ PASSED
  • [v3.0] TC-V3-003: GET /guests?side=Bride filters bride side guests... ✅ PASSED
  • [v3.0] TC-V3-004: PUT /guests/:id confirms guest RSVP attendance... ✅ PASSED
  • [v3.0] TC-V3-005: POST /budget creates dual-tradition expense line... ✅ PASSED
  • [v3.0] TC-V3-006: GET /budget computes totalAllocated, totalActual, balance... ✅ PASSED
  • [v3.0] TC-V3-007: PUT /budget/:id marks expense paid... ✅ PASSED
  • [v3.0] TC-V3-008: POST /checklist creates milestone planning task... ✅ PASSED
  • [v3.0] TC-V3-009: PUT /checklist/:id toggles task completion status... ✅ PASSED
  • [v3.0] TC-V3-010: GET /checklist?completed=true filters finished milestones... ✅ PASSED
  • [v3.0] TC-V3-011: End-to-End Lifecycle (Inquiry -> Board -> RSVP -> Budget -> Task)... ✅ PASSED

------------------------------------------------------
 📊 v3.0 SUMMARY: Passed: 11 | Failed: 0 | Total: 11
------------------------------------------------------

======================================================
 🏆 ALL 3 VERSION TEST SUITES PASSED SUCCESSFULLY!
 ⏱️  Total Duration: 0.83s
 • Version 1.0 (Core Foundation):       10/10 Passed (100%)
 • Version 2.0 (AI Curation & Auth):     11/11 Passed (100%)
 • Version 3.0 (Enterprise Management):  11/11 Passed (100%)
 • Total Executed Test Cases:            32/32 Passed (100%)
======================================================
```

---

## 📋 6. Summary Checklist for GitHub Submission

1. [x] **Repository Created:** [`AaryanThummar/RitualRoute`](https://github.com/AaryanThummar/RitualRoute)
2. [x] **Collaborators Configured:**
   - `@devpansuriya` (Accepted)
   - `@hetviigajeraa` (Pending Invite)
   - `@maheksomaiya2-commits` (Accepted)
   - `@saanvighadiali1086` (Accepted)
   - `@smeetsavla` (Pending Invite)
3. [ ] **Accept Pending Invites:** `@hetviigajeraa` and `@smeetsavla` click "Accept invitation" on GitHub.
4. [ ] **Push Branches:** Run `git remote add origin https://github.com/AaryanThummar/RitualRoute.git` and push `v1.0-core-foundation`, `v2.0-ai-curation-auth`, and `v3.0-full-wedding-management`.
5. [ ] **Default Branch:** Set `v3.0-full-wedding-management` as default on GitHub.
6. [ ] **Automated Testing:** Run `npm test` before every merge to guarantee 32/32 tests pass.
