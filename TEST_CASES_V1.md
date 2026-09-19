# Test Case Specification — Version 1.0 (Core Foundation / MVP)

**Product:** Heritage & Harmony — Cross-Cultural Wedding Planner  
**Tier:** Version 1.0 (Core Foundation / MVP)  
**Base Endpoint:** `http://localhost:5000/api/v1`  
**Execution Command:** `npm run test:v1` (inside `wedding/server`)

---

## 1. Overview & Scope
Version 1.0 establishes the core operational baseline of the application:
- Health telemetry and database state verification
- Contact & consultation inquiry submission with validation
- Querying and filtering customer inquiries by status
- Regional traditions knowledge base retrieval (rituals, music, florals, palettes)
- Luxury services catalog retrieval
- Royal destination venues catalog retrieval

---

## 2. Test Case Matrix

| Test ID | Test Name | Endpoint | Method | Expected Status | Validation Criteria |
|---|---|---|---|---|---|
| **TC-V1-001** | System Health Telemetry | `/api/v1/health` | `GET` | `200 OK` | `status: "online"`, `version: "1.0.0"`, `tier: "Core Foundation / MVP"` |
| **TC-V1-002** | Traditions Catalog Retrieval | `/api/v1/traditions` | `GET` | `200 OK` | Returns array with Punjabi, Tamil, Bengali, Gujarati traditions |
| **TC-V1-003** | Services Atelier Catalog | `/api/v1/services` | `GET` | `200 OK` | Returns exactly 9 luxury services matching frontend atelier |
| **TC-V1-004** | Destination Venues Retrieval | `/api/v1/destinations` | `GET` | `200 OK` | Returns 4 destinations (Udaipur, Jaipur, Goa, Kerala) |
| **TC-V1-005** | Submit Valid Contact Inquiry | `/api/v1/inquiries` | `POST` | `201 Created` | Saves record to DB, assigns `_id`, sets default status `"New"` |
| **TC-V1-006** | Inquiry Missing Required Fields | `/api/v1/inquiries` | `POST` | `400 Bad Request` | Rejects payload missing `name` or `email`, returns error message |
| **TC-V1-007** | List All Inquiries | `/api/v1/inquiries` | `GET` | `200 OK` | Returns `data` array with total count and timestamps |
| **TC-V1-008** | Fetch Inquiry by Identifier | `/api/v1/inquiries/:id` | `GET` | `200 OK` | Returns specific inquiry record matching query ID |
| **TC-V1-009** | Update Inquiry Status | `/api/v1/inquiries/:id` | `PATCH` | `200 OK` | Updates status to `"Consultation Scheduled"` and adds notes |
| **TC-V1-010** | Filter Inquiries by Status | `/api/v1/inquiries?status=...`| `GET` | `200 OK` | Every returned item matches queried status filter |

---

## 3. Detailed Test Specifications

### TC-V1-001: System Health Telemetry
- **Description:** Verifies that the v1 endpoint is online and correctly reports v1 metadata.
- **Request:**
  ```http
  GET /api/v1/health HTTP/1.1
  Host: localhost:5000
  ```
- **Expected Response:**
  ```json
  {
    "status": "online",
    "version": "1.0.0",
    "tier": "Core Foundation / MVP",
    "database": {
      "connected": true,
      "host": "127.0.0.1",
      "name": "wedding_planner"
    }
  }
  ```

---

### TC-V1-005: Submit Valid Contact Inquiry
- **Description:** Submits a customer inquiry from the contact form and validates database persistence.
- **Request:**
  ```http
  POST /api/v1/inquiries HTTP/1.1
  Host: localhost:5000
  Content-Type: application/json

  {
    "name": "Simran & Arjun",
    "email": "simran.arjun@test.com",
    "tradition": "Punjabi Sikh + Gujarati Hindu",
    "message": "Planning a winter wedding in Udaipur blending Anand Karaj and Garba."
  }
  ```
- **Expected Response:** `201 Created`
  ```json
  {
    "success": true,
    "message": "Inquiry received successfully. Our private concierge will contact you within 24 hours.",
    "data": {
      "_id": "<ObjectId>",
      "name": "Simran & Arjun",
      "email": "simran.arjun@test.com",
      "tradition": "Punjabi Sikh + Gujarati Hindu",
      "status": "New",
      "createdAt": "<ISO Date>"
    }
  }
  ```

---

### TC-V1-006: Inquiry Validation Error
- **Description:** Validates that incomplete payloads are blocked with clear feedback.
- **Request:**
  ```http
  POST /api/v1/inquiries HTTP/1.1
  Host: localhost:5000
  Content-Type: application/json

  {
    "tradition": "Only Tradition Given"
  }
  ```
- **Expected Response:** `400 Bad Request`
  ```json
  {
    "success": false,
    "error": "Name and email are required fields"
  }
  ```

---

## 4. Test Execution Summary
- **Total Test Cases:** 10
- **Automated Runner File:** `wedding/server/tests/test_v1.js`
- **Execution Result:** 10 Passed, 0 Failed (100% Pass Rate)
