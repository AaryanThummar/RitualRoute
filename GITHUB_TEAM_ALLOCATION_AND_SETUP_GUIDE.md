# GitHub Team Collaboration, Role Allocation & Multi-Version Testing Guide
**Project:** Heritage & Harmony — Cross-Cultural Wedding Planner  
**Date:** September 2026  
**Document Version:** 1.0.0  

---

## 👥 1. Team Roster & Role Allocation Matrix

| Team Member | Official Title | Core Responsibilities | Modules & Files Owned | Working Feature Branch |
|---|---|---|---|---|
| **Aaryan Thumar** | **Project Owner / Scrum Master / System Architect** | • GitHub Repository setup & governance<br>• Sprint backlog & milestone planning<br>• Branch protection rules & merge approvals<br>• End-to-end architectural integrity | • Repository Settings & Permissions<br>• `.gitignore`, Root README, License<br>• Architectural blueprints & ADRs<br>• Release gating & CI/CD workflows | `arch/system-orchestration`<br>`release/v3.0` |
| **Dev Pansuriya** | **System Architect / Backend Developer** | • API gateway routing & versioning<br>• AI Wedding Concierge curation engine<br>• Dual-protocol ceremonial timeline synthesis<br>• Fusion cuisine & color palette logic | • `wedding/server/index.js`<br>• `wedding/server/controllers/curationController.js`<br>• `wedding/server/routes/curationRoutes.js`<br>• Middleware coordination | `feature/ai-curation-engine`<br>`feature/api-gateway` |
| **Smeet Savla** | **Database Designer / Backend Developer** | • Mongoose ODM schema architecture<br>• Database indexing & query optimization<br>• Resilient fallback in-memory state<br>• Data seeders & migration scripts | • `wedding/server/config/db.js`<br>• `wedding/server/models/*` (all 7 models)<br>• `wedding/server/scripts/seed.js`<br>• `wedding/server/data/*` | `feature/db-schemas-and-models`<br>`feature/db-seeders` |
| **Sanvi Ghadiali** | **Backend Developer / Tester** | • Automated test suites (v1, v2, v3)<br>• Master test runner orchestration<br>• User authentication (JWT + Bcrypt)<br>• Guest RSVP ledger & budget math | • `wedding/server/tests/*` (all 4 test files)<br>• `TEST_CASES_V1.md`, `V2.md`, `V3.md`<br>• `wedding/server/controllers/authController.js`<br>• `wedding/server/controllers/guestController.js` | `test/qa-automation-suite`<br>`feature/auth-and-guests` |
| **Mahek Somaiya** | **Communication Lead** | • Cultural rituals & tradition research<br>• Destination venues & atelier content<br>• Client inquiry lifecycle & communication<br>• Documentation, release notes & PR copy | • `wedding/server/controllers/contentController.js`<br>• `wedding/server/controllers/inquiryController.js`<br>• `wedding/server/routes/inquiryRoutes.js`<br>• Release announcements & client copy | `docs/traditions-catalog`<br>`feature/inquiries-crm` |
| **Hetvi Gajera** | **UI/UX Designer** | • Visual design system & royal aesthetics<br>• Design tokens (palettes, typography, glassmorphism)<br>• Responsive client components<br>• AI Board visualization & RSVP modal UI | • `client-old/src/*` (or `wedding/client`)<br>• UI styling (`index.css`, component CSS)<br>• Wireframes, mockups, and assets<br>• Interactive user flow transitions | `design/luxury-theme`<br>`design/client-ui` |

---

## 🛠️ 2. How to Set Up & Put the Code on GitHub

### Step 2.1: Create the Remote Repository on GitHub (Done by Aaryan Thumar)
1. Navigate to [GitHub](https://github.com) and sign in.
2. In the top right corner, click **`+`** &rarr; **New repository**.
3. **Repository Name:** `cross-cultural-wedding-planner`
4. **Description:** `Heritage & Harmony — Enterprise Cross-Cultural Wedding Planner with Multi-Version Architecture & AI Concierge`
5. **Visibility:** Choose **Public** (or **Private** based on course/client preference).
6. **Initialize this repository with:**
   - [ ] Add a README file: **UNCHECK** (Do not check, we already have our codebase initialized).
   - [ ] Add .gitignore: **None** (We already have `.gitignore`).
   - [ ] Choose a license: **None** (or MIT).
7. Click **Create repository**.

---

### Step 2.2: Add All Team Members as Collaborators (Aaryan Thumar)
1. In the GitHub repository, click **Settings** &rarr; **Collaborators**.
2. Click **Add people**.
3. Search by GitHub username or email for each team member:
   - Dev Pansuriya
   - Smeet Savla
   - Sanvi Ghadiali
   - Mahek Somaiya
   - Hetvi Gajera
4. Assign them **Write** (or **Admin**) permissions so they can clone, push feature branches, and submit Pull Requests.
5. Each team member accepts the email/notification invitation.

---

### Step 2.3: Link Local Git Repository & Push All 3 Versions
The local workspace already contains all 3 branches (`v1.0-core-foundation`, `v2.0-ai-curation-auth`, and `v3.0-full-wedding-management`). Run the following commands in the project root:

```powershell
# 1. Navigate to project root
cd "c:\Users\Depanshi\OneDrive\Desktop\Cross Cultural Wedding Planner\Cross Cultural Wedding Planner"

# 2. Link your remote GitHub repository
git remote add origin https://github.com/YOUR_GITHUB_ORG_OR_USERNAME/cross-cultural-wedding-planner.git

# 3. Push Branch 1 (v1.0 Core Foundation)
git push -u origin v1.0-core-foundation

# 4. Push Branch 2 (v2.0 AI Curation & Auth)
git push -u origin v2.0-ai-curation-auth

# 5. Push Branch 3 (v3.0 Full Wedding Management)
git push -u origin v3.0-full-wedding-management
```

---

### Step 2.4: Set the Default Branch & Branch Protection Rules
1. On GitHub, go to **Settings** &rarr; **Branches**.
2. Under **Default branch**, click the switch icon and select **`v3.0-full-wedding-management`** &rarr; Click **Update**.
3. Under **Branch protection rules**, click **Add branch ruleset** (or **Add rule**):
   - **Branch name pattern:** `v*` (protects `v1.0-*`, `v2.0-*`, `v3.0-*`).
   - Check: **Require a pull request before merging** (Require at least 1 approval).
   - Check: **Require status checks to pass before merging** (`npm test`).
   - Check: **Do not allow bypassing the above settings**.

---

## 🔄 3. Individual Team Member Workflow (Who Adds What & How)

Every team member follows this standardized feature branch and PR workflow:

```
[Remote: v3.0-full-wedding-management]
       │
       ├── git checkout -b feature/your-name-feature
       │        (Dev, Smeet, Sanvi, Mahek, Hetvi work locally)
       │
       ├── git commit -m "feat(...): descriptive change"
       │
       ├── git push origin feature/your-name-feature
       │
       └── GitHub Pull Request (PR) ──> Code Review & Tests Passed ──> Merge into v3.0
```

### Specific Workflow Per Member:

#### 1. Dev Pansuriya (AI Concierge & API Routes)
```powershell
# Create feature branch off v3.0
git checkout v3.0-full-wedding-management
git pull origin v3.0-full-wedding-management
git checkout -b feature/ai-curation-enhancements

# Work on wedding/server/controllers/curationController.js
git add wedding/server/controllers/curationController.js wedding/server/routes/curationRoutes.js
git commit -m "feat(curation): refine cross-cultural ritual harmonization algorithm"
git push -u origin feature/ai-curation-enhancements
# Open PR on GitHub -> Request review from Sanvi & Aaryan
```

#### 2. Smeet Savla (Database Models & Seeding)
```powershell
# Create feature branch off v3.0
git checkout v3.0-full-wedding-management
git pull origin v3.0-full-wedding-management
git checkout -b feature/database-optimization

# Work on models and seed data
git add wedding/server/models/ wedding/server/config/db.js wedding/server/scripts/seed.js
git commit -m "feat(db): add compound index on guests and update budget variance calculation"
git push -u origin feature/database-optimization
# Open PR on GitHub -> Request review from Dev & Aaryan
```

#### 3. Sanvi Ghadiali (Testing & Auth Security)
```powershell
# Create feature branch off v3.0
git checkout v3.0-full-wedding-management
git pull origin v3.0-full-wedding-management
git checkout -b test/qa-regression-v3

# Work on test cases and auth validations
git add wedding/server/tests/ TEST_CASES_V*.md wedding/server/controllers/authController.js
git commit -m "test(qa): add edge case tests for token expiration and budget limits"
git push -u origin test/qa-regression-v3
# Run npm test locally to ensure 32/32 tests pass before opening PR
```

#### 4. Mahek Somaiya (Cultural Traditions & Inquiries Catalog)
```powershell
# Create feature branch off v3.0
git checkout v3.0-full-wedding-management
git pull origin v3.0-full-wedding-management
git checkout -b docs/traditions-and-venues-catalog

# Work on traditions content and inquiry flows
git add wedding/server/data/ wedding/server/controllers/contentController.js
git commit -m "content(traditions): expand Bengali-Tamil ceremonial ritual pairings and floral specs"
git push -u origin docs/traditions-and-venues-catalog
# Open PR on GitHub -> Request review from Hetvi & Aaryan
```

#### 5. Hetvi Gajera (UI/UX Luxury Client Experience)
```powershell
# Create feature branch off v3.0
git checkout v3.0-full-wedding-management
git pull origin v3.0-full-wedding-management
git checkout -b design/luxury-theme-system

# Work on client UI components and responsive styling
git add client-old/ (or wedding/client/)
git commit -m "style(ui): implement royal ivory and burgundy theme with glassmorphism cards"
git push -u origin design/luxury-theme-system
# Open PR on GitHub -> Request review from Mahek & Aaryan
```

#### 6. Aaryan Thumar (Scrum Master & Architecture Review)
- Reviews PRs on GitHub.
- Verifies that `npm test` passes 32/32 tests.
- Merges PR into `v3.0-full-wedding-management`.
- Tags official releases: `git tag -a v3.0.0 -m "Release Version 3.0.0" && git push origin --tags`.

---

## 🏛️ 4. The 3 Versions (3 V's) Architecture Breakdown

```
Heritage & Harmony Version Hierarchy
=======================================================================
[Version 1.0] Core Foundation (MVP)
  │  Branch: v1.0-core-foundation
  │  Features: Inquiries CRM, Regional Traditions, Luxury Services,
  │            Royal Venues, System Health Telemetry.
  │  Tests: 10 Automated Integration Tests (TC-V1-001 to TC-V1-010)
  │
  ▼
[Version 2.0] Intelligence & Coordination
  │  Branch: v2.0-ai-curation-auth
  │  Features: AI Concierge Curation Engine (Fusion detection, dual-timeline
  │            synthesis, color harmony, gastronomy), JWT/Bcrypt Couple Auth,
  │            Persistent Board storage with shareable ID.
  │  Tests: 11 Automated Integration Tests (TC-V2-001 to TC-V2-011)
  │
  ▼
[Version 3.0] Enterprise Wedding Management
     Branch: v3.0-full-wedding-management
     Features: Multi-Cultural Guest & RSVP Ledger, Dual-Tradition Smart
               Budget Calculator, Multi-Ceremony Milestone Checklist,
               Master Test Runner across all 3 tiers.
     Tests: 11 Automated Integration Tests (TC-V3-001 to TC-V3-011)
            + 32/32 Cumulative Tests Executed Sequentially
```

---

## 🧪 5. All Three Test Suites & Verified Test Results

### 5.1 Version 1.0 Test Suite (Core Foundation)
- **Base Endpoint:** `http://localhost:5000/api/v1`
- **Execution Command:** `npm run test:v1` (inside `wedding/server`)

| Test ID | Test Name | Endpoint | Method | Expected | Result |
|---|---|---|---|---|:---:|
| **TC-V1-001** | System Health Telemetry | `/api/v1/health` | `GET` | `200 OK`, `version: 1.0.0`, status online | ✅ **PASSED** |
| **TC-V1-002** | Traditions Catalog Retrieval | `/api/v1/traditions` | `GET` | `200 OK`, Array with cultural rituals | ✅ **PASSED** |
| **TC-V1-003** | Services Atelier Catalog | `/api/v1/services` | `GET` | `200 OK`, Exactly 9 luxury services | ✅ **PASSED** |
| **TC-V1-004** | Destination Venues Retrieval | `/api/v1/destinations` | `GET` | `200 OK`, 4 Royal venues | ✅ **PASSED** |
| **TC-V1-005** | Submit Valid Contact Inquiry | `/api/v1/inquiries` | `POST` | `201 Created`, DB record saved | ✅ **PASSED** |
| **TC-V1-006** | Inquiry Missing Required Fields | `/api/v1/inquiries` | `POST` | `400 Bad Request`, validation message | ✅ **PASSED** |
| **TC-V1-007** | List All Inquiries | `/api/v1/inquiries` | `GET` | `200 OK`, Array of inquiries | ✅ **PASSED** |
| **TC-V1-008** | Fetch Inquiry by Identifier | `/api/v1/inquiries/:id` | `GET` | `200 OK`, Single inquiry record | ✅ **PASSED** |
| **TC-V1-009** | Update Inquiry Status | `/api/v1/inquiries/:id` | `PATCH` | `200 OK`, status updated | ✅ **PASSED** |
| **TC-V1-010** | Filter Inquiries by Status | `/api/v1/inquiries?status=...` | `GET` | `200 OK`, filtered records matching status | ✅ **PASSED** |

**Version 1.0 Summary:** **10 Passed / 0 Failed (100% Pass Rate)**

---

### 5.2 Version 2.0 Test Suite (AI Curation & Auth)
- **Base Endpoint:** `http://localhost:5000/api/v2`
- **Execution Command:** `npm run test:v2` (inside `wedding/server`)

| Test ID | Test Name | Endpoint | Method | Expected | Result |
|---|---|---|---|---|:---:|
| **TC-V2-001** | Version 2.0 Health Telemetry | `/api/v2/health` | `GET` | `200 OK`, `version: 2.0.0`, tier metadata | ✅ **PASSED** |
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

| Test ID | Test Name | Endpoint | Method | Expected | Result |
|---|---|---|---|---|:---:|
| **TC-V3-001** | Version 3.0 Health Telemetry | `/api/v3/health` | `GET` | `200 OK`, `version: 3.0.0`, tier metadata | ✅ **PASSED** |
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

**Actual Terminal Output:**
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

## 📋 6. Summary Checklist for Submitting to GitHub

1. [ ] **Repository Creation:** Aaryan creates `cross-cultural-wedding-planner` on GitHub.
2. [ ] **Collaborators:** Aaryan invites Dev, Smeet, Sanvi, Mahek, and Hetvi.
3. [ ] **Pushing Branches:** Push `v1.0-core-foundation`, `v2.0-ai-curation-auth`, and `v3.0-full-wedding-management`.
4. [ ] **Set Default Branch:** Set `v3.0-full-wedding-management` as default on GitHub.
5. [ ] **Daily Development:** Team members branch off `v3.0-full-wedding-management`, commit changes, push, and open Pull Requests.
6. [ ] **Verification:** Run `npm test` before every merge to guarantee 100% test pass (32/32).
