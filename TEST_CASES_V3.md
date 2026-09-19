# Test Case Specification — Version 3.0 (Enterprise Wedding Management)

**Product:** Heritage & Harmony — Cross-Cultural Wedding Planner  
**Tier:** Version 3.0 (Enterprise Wedding Management)  
**Base Endpoint:** `http://localhost:5000/api/v3`  
**Execution Command:** `npm run test:v3` (inside `wedding/server`)

---

## 1. Overview & Scope
Version 3.0 provides the comprehensive wedding execution suite:
- Multi-Cultural Guest & RSVP ledger tracking family sides (Bride / Groom / Both), cultural background, dietary requirements, and multi-ceremony attendance
- Smart Dual-Tradition Budget Calculator tracking allocations, actual expenses, variances, and paid statuses across different traditions
- Multi-Ceremony Milestone Checklist managing planning tasks tagged by tradition and ceremony
- End-to-End full lifecycle orchestration (Lead -> AI Board -> RSVP -> Budget -> Tasks)

---

## 2. Test Case Matrix

| Test ID | Test Name | Endpoint | Method | Expected Status | Validation Criteria |
|---|---|---|---|---|---|
| **TC-V3-001** | Version 3.0 Health Telemetry | `/api/v3/health` | `GET` | `200 OK` | `version: "3.0.0"`, `tier: "Enterprise Wedding Management"`, lists full suite endpoints |
| **TC-V3-002** | Create Guest / RSVP | `/api/v3/guests` | `POST` | `201 Created` | Saves guest with family side (`Bride`), culture (`Punjabi`), dietary preference, and ceremonies |
| **TC-V3-003** | Filter Guests by Family Side | `/api/v3/guests?side=Bride` | `GET` | `200 OK` | Returns only guests where `side === 'Bride'` |
| **TC-V3-004** | Update RSVP Status | `/api/v3/guests/:id` | `PUT` | `200 OK` | Changes status from `"Pending"` to `"Confirmed"` |
| **TC-V3-005** | Create Budget Allocation | `/api/v3/budget` | `POST` | `201 Created` | Saves dual-tradition expense line item with allocation |
| **TC-V3-006** | Budget Mathematical Calculations | `/api/v3/budget` | `GET` | `200 OK` | Computes `summary.totalAllocated`, `totalActual`, and `balance` accurately |
| **TC-V3-007** | Mark Expense Paid | `/api/v3/budget/:id` | `PUT` | `200 OK` | Updates `paid: true` on budget item |
| **TC-V3-008** | Create Multi-Ceremony Task | `/api/v3/checklist` | `POST` | `201 Created` | Saves task with `ceremonyTag` and milestone timeline |
| **TC-V3-009** | Toggle Task Completion | `/api/v3/checklist/:id` | `PUT` | `200 OK` | Sets `completed: true` |
| **TC-V3-010** | Filter Completed Tasks | `/api/v3/checklist?completed=true` | `GET` | `200 OK` | Returns array where every item has `completed: true` |
| **TC-V3-011** | Full End-to-End Lifecycle Flow | Multiple | Mixed | `200/201 OK` | Executes Inquiry -> Curation Board -> RSVP -> Budget -> Task -> Cleanup successfully |

---

## 3. Detailed Test Specifications

### TC-V3-002: Create Guest with Cultural Attributes
- **Description:** Verifies guest creation with dietary requirements and ceremony assignments.
- **Request:**
  ```http
  POST /api/v3/guests HTTP/1.1
  Host: localhost:5000
  Content-Type: application/json

  {
    "name": "Uncle Harpreet & Family",
    "side": "Bride",
    "culture": "Punjabi",
    "email": "harpreet@family.com",
    "phone": "+91 98111 22233",
    "status": "Pending",
    "dietary": "Pure Vegetarian",
    "invitedEvents": ["Maiya & Chooda", "Anand Karaj", "Grand Reception"],
    "plusOne": true
  }
  ```
- **Validation Criteria:**
  - `status: 201`
  - Record persisted with assigned `_id`
  - `side` stored as `"Bride"`
  - `dietary` stored as `"Pure Vegetarian"`

---

### TC-V3-006: Budget Calculations
- **Description:** Verifies that the server aggregates financial figures correctly across all expense categories.
- **Request:**
  ```http
  GET /api/v3/budget HTTP/1.1
  Host: localhost:5000
  ```
- **Expected Summary Structure:**
  ```json
  {
    "success": true,
    "summary": {
      "totalAllocated": 7000000,
      "totalActual": 6800000,
      "balance": 200000
    },
    "count": 4,
    "data": [...]
  }
  ```
- **Assertion:** `summary.balance === summary.totalAllocated - summary.totalActual`

---

## 4. Test Execution Summary
- **Total Test Cases:** 11
- **Automated Runner File:** `wedding/server/tests/test_v3.js`
- **Execution Result:** 11 Passed, 0 Failed (100% Pass Rate)
