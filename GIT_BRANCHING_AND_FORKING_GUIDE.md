# Comprehensive Git Branching & Forking Guide

This guide provides step-by-step instructions to set up **3 distinct branches** for the **Cross-Cultural Wedding Planner ("Heritage & Harmony")** project, commit each version tier, publish them to a remote Git host (such as GitHub or GitLab), and fork/manage the repository.

---

## 🌳 Version & Branch Structure

```
Repository Root
│
├── Branch: v1.0-core-foundation
│   └── Core REST API (Inquiries, Regional Traditions, Services, Destinations, Health)
│       └── Automated Test: npm run test:v1 (10/10 tests)
│
├── Branch: v2.0-ai-curation-auth (branched from v1.0)
│   └── Adds AI Wedding Concierge Curation Engine + JWT/Bcrypt Couple & Admin Auth
│       └── Automated Test: npm run test:v2 (11/11 tests)
│
└── Branch: v3.0-full-wedding-management (branched from v2.0 & default)
    └── Adds Guests & RSVP Ledger, Dual-Tradition Budget Calculator, Milestone Checklist
        └── Automated Test: npm run test:v3 & npm test (32/32 tests)
```

---

## Part 1: Initializing Your Git Repository Locally

Open your terminal or PowerShell in the root directory:
```powershell
cd "c:\Users\Depanshi\OneDrive\Desktop\Cross Cultural Wedding Planner\Cross Cultural Wedding Planner"
```

### Step 1.1: Ensure `.gitignore` Exists
Create or verify `.gitignore` in the root folder so temporary dependencies and logs are not tracked:
```gitignore
node_modules/
.env
dist/
*.log
.DS_Store
```

### Step 1.2: Initialize Git
```powershell
git init
```

---

## Part 2: Setting Up the 3 Version Branches

---

### Step 2.1: Branch 1 — `v1.0-core-foundation`

Create and switch to the `v1.0-core-foundation` branch:
```powershell
git checkout -b v1.0-core-foundation
```

Stage the core foundation files:
```powershell
git add client-old/
git add wedding/server/config/
git add wedding/server/models/Inquiry.js
git add wedding/server/models/Tradition.js
git add wedding/server/controllers/inquiryController.js
git add wedding/server/controllers/contentController.js
git add wedding/server/routes/inquiryRoutes.js
git add wedding/server/routes/contentRoutes.js
git add wedding/server/middleware/
git add wedding/server/tests/test_v1.js
git add wedding/server/package.json
git add wedding/server/index.js
git add TEST_CASES_V1.md
git add .gitignore
```

Commit Version 1.0:
```powershell
git commit -m "feat(v1.0): core foundation with inquiries, traditions catalog, and health telemetry"
```

Verify Version 1.0 tests on this branch:
```powershell
cd wedding/server
npm run test:v1
cd ../..
```

---

### Step 2.2: Branch 2 — `v2.0-ai-curation-auth`

Branch off `v1.0-core-foundation` to create `v2.0-ai-curation-auth`:
```powershell
git checkout -b v2.0-ai-curation-auth
```

Stage the Version 2.0 files (AI Curation Engine + User Auth):
```powershell
git add wedding/server/models/WeddingBoard.js
git add wedding/server/models/User.js
git add wedding/server/controllers/curationController.js
git add wedding/server/controllers/authController.js
git add wedding/server/routes/curationRoutes.js
git add wedding/server/routes/authRoutes.js
git add wedding/server/tests/test_v2.js
git add TEST_CASES_V2.md
```

Commit Version 2.0:
```powershell
git commit -m "feat(v2.0): add AI cross-cultural wedding concierge curation engine and JWT/bcrypt authentication"
```

Verify Version 2.0 tests on this branch:
```powershell
cd wedding/server
npm run test:v2
cd ../..
```

---

### Step 2.3: Branch 3 — `v3.0-full-wedding-management`

Branch off `v2.0-ai-curation-auth` to create `v3.0-full-wedding-management`:
```powershell
git checkout -b v3.0-full-wedding-management
```

Stage the Version 3.0 files (Guests, Budget, Checklist, Master Test Runner):
```powershell
git add wedding/server/models/Guest.js
git add wedding/server/models/Budget.js
git add wedding/server/models/Checklist.js
git add wedding/server/controllers/guestController.js
git add wedding/server/controllers/budgetController.js
git add wedding/server/controllers/checklistController.js
git add wedding/server/routes/guestRoutes.js
git add wedding/server/routes/budgetRoutes.js
git add wedding/server/routes/checklistRoutes.js
git add wedding/server/data/
git add wedding/server/scripts/
git add wedding/server/tests/test_v3.js
git add wedding/server/tests/run_all_tests.js
git add TEST_CASES_V3.md
git add GIT_BRANCHING_AND_FORKING_GUIDE.md
git add wedding/server/README.md
```

Commit Version 3.0:
```powershell
git commit -m "feat(v3.0): complete enterprise wedding management suite with RSVP ledger, budget tracker, and checklist"
```

Run the complete test suite on Version 3.0:
```powershell
cd wedding/server
npm test
cd ../..
```

---

## Part 3: Publishing the 3 Branches to GitHub / GitLab

### Step 3.1: Create a Remote Repository
1. Log in to your GitHub account (or GitLab / Bitbucket).
2. Click the **`+`** icon in the top right &rarr; **New repository**.
3. Name it: `cross-cultural-wedding-planner`.
4. Leave *"Initialize this repository with a README"* **unchecked** (we already have local commits).
5. Click **Create repository**.

### Step 3.2: Link Remote & Push All 3 Branches
Run in your PowerShell terminal:
```powershell
# Link your remote repository
git remote add origin https://github.com/AaryanThummar/RitualRoute.git

# Push Branch 1
git push -u origin v1.0-core-foundation

# Push Branch 2
git push -u origin v2.0-ai-curation-auth

# Push Branch 3
git push -u origin v3.0-full-wedding-management
```

### Step 3.3: Set Default Branch
On GitHub:
1. Go to repository **Settings** &rarr; **Branches**.
2. Click the switch icon next to the default branch.
3. Select `v3.0-full-wedding-management` (or `main`) as the default branch and click **Update**.

---

## Part 4: How to Fork the Repository

Forking allows you or other developers to create an independent copy of the project under a different GitHub account to contribute features or maintain custom variants.

### Step 4.1: Forking via GitHub Web UI
1. Navigate to the main repository URL:
   `https://github.com/ORIGINAL_OWNER/cross-cultural-wedding-planner`
2. In the top-right corner of the page, click the **Fork** button:
   ```
   [ Fork ] ▾
   ```
3. In the dialog:
   - Choose your personal account or organization as the **Owner**.
   - Ensure the checkbox **"Copy the default branch only"** is **UNCHECKED** if you want all 3 version branches (`v1.0`, `v2.0`, and `v3.0`) in your fork.
4. Click **Create fork**.
5. GitHub will duplicate the repository into `https://github.com/YOUR_FORK_USERNAME/cross-cultural-wedding-planner`.

---

### Step 4.2: Cloning & Configuring the Fork Locally

Clone your forked repository:
```powershell
git clone https://github.com/YOUR_FORK_USERNAME/cross-cultural-wedding-planner.git
cd cross-cultural-wedding-planner
```

View configured remotes:
```powershell
git remote -v
# Output:
# origin  https://github.com/YOUR_FORK_USERNAME/cross-cultural-wedding-planner.git (fetch)
# origin  https://github.com/YOUR_FORK_USERNAME/cross-cultural-wedding-planner.git (push)
```

Add the original repository as the `upstream` remote:
```powershell
git remote add upstream https://github.com/ORIGINAL_OWNER/cross-cultural-wedding-planner.git
```

Verify both remotes:
```powershell
git remote -v
# Output:
# origin    https://github.com/YOUR_FORK_USERNAME/cross-cultural-wedding-planner.git (fetch)
# origin    https://github.com/YOUR_FORK_USERNAME/cross-cultural-wedding-planner.git (push)
# upstream  https://github.com/ORIGINAL_OWNER/cross-cultural-wedding-planner.git (fetch)
# upstream  https://github.com/ORIGINAL_OWNER/cross-cultural-wedding-planner.git (push)
```

---

### Step 4.3: Syncing Your Fork with Upstream Changes
Whenever the upstream repository has updates:
```powershell
# 1. Fetch upstream branches
git fetch upstream

# 2. Switch to the branch you want to update
git checkout v3.0-full-wedding-management

# 3. Merge upstream updates into your fork branch
git merge upstream/v3.0-full-wedding-management

# 4. Push updated branch to your fork
git push origin v3.0-full-wedding-management
```

---

### Step 4.4: Submitting a Pull Request from Your Fork
1. Create a feature branch in your fork:
   ```powershell
   git checkout -b feat-new-ritual-support
   ```
2. Make your code changes and commit:
   ```powershell
   git commit -am "feat: add Rajasthani folk music troupe integration"
   ```
3. Push the feature branch to your fork:
   ```powershell
   git push -u origin feat-new-ritual-support
   ```
4. On GitHub, visit your fork repository. You will see a banner:
   **`Compare & pull request`**.
5. Select the base repository (`ORIGINAL_OWNER/cross-cultural-wedding-planner`) and base branch (`v3.0-full-wedding-management`), enter a summary of changes, and click **Create pull request**.

---

## 📋 Summary of Commands Quick Reference

| Action | Command |
|---|---|
| Initialize Local Repo | `git init` |
| Create & Switch Branch | `git checkout -b <branch-name>` |
| Switch Branch | `git checkout <branch-name>` |
| Run Version 1.0 Tests | `npm run test:v1` |
| Run Version 2.0 Tests | `npm run test:v2` |
| Run Version 3.0 Tests | `npm run test:v3` |
| Run All Version Tests | `npm test` |
| Add Upstream Remote | `git remote add upstream <original-repo-url>` |
| Sync Fork with Upstream | `git fetch upstream && git merge upstream/<branch>` |
