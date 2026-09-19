/**
 * TEST SUITE: VERSION 1.0 (Core Foundation / MVP Tier)
 * Tests core endpoints: Health, Inquiries, Traditions, Services, Destinations
 */

const assert = require('assert');

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:5000/api/v1';

async function runV1Tests() {
  console.log('\n======================================================');
  console.log(' 🧪 RUNNING TEST SUITE: VERSION 1.0 (Core Foundation)');
  console.log(` 🌐 Base URL: ${BASE_URL}`);
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`  • [v1.0] ${name}... `);
      await fn();
      console.log('✅ PASSED');
      passed++;
    } catch (err) {
      console.log(`❌ FAILED: ${err.message}`);
      failed++;
    }
  }

  // TC-V1-001: Health Check
  await test('TC-V1-001: Health Check returns v1.0.0 metadata', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert.strictEqual(res.status, 200, `Expected 200, got ${res.status}`);
    const data = await res.json();
    assert.strictEqual(data.status, 'online');
    assert.strictEqual(data.version, '1.0.0');
    assert.strictEqual(data.tier, 'Core Foundation / MVP');
  });

  // TC-V1-002: Fetch Traditions Catalog
  await test('TC-V1-002: GET /traditions returns cultural rituals', async () => {
    const res = await fetch(`${BASE_URL}/traditions`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.data), 'Data should be an array');
    assert.ok(data.data.length >= 4, 'Should contain multiple cultural traditions');
    const cultures = data.data.map(t => t.culture);
    assert.ok(cultures.some(c => c.includes('Punjabi')), 'Should include Punjabi traditions');
    assert.ok(cultures.some(c => c.includes('Tamil')), 'Should include Tamil traditions');
  });

  // TC-V1-003: Fetch Services Catalog
  await test('TC-V1-003: GET /services returns atelier service catalog', async () => {
    const res = await fetch(`${BASE_URL}/services`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.count, 9, 'Should return 9 luxury services');
  });

  // TC-V1-004: Fetch Destinations Catalog
  await test('TC-V1-004: GET /destinations returns royal destination venues', async () => {
    const res = await fetch(`${BASE_URL}/destinations`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.data.length >= 4, 'Should return at least 4 destinations');
    const cities = data.data.map(d => d.city);
    assert.ok(cities.includes('Udaipur'), 'Should feature Udaipur');
    assert.ok(cities.includes('Jaipur'), 'Should feature Jaipur');
  });

  // TC-V1-005: Submit Valid Contact Inquiry
  let createdInquiryId = null;
  await test('TC-V1-005: POST /inquiries saves lead inquiry', async () => {
    const payload = {
      name: 'Simran & Arjun Test',
      email: 'simran.arjun@test.com',
      tradition: 'Punjabi Sikh + Gujarati Hindu',
      message: 'Automated test inquiry for version 1.0 validation.'
    };
    const res = await fetch(`${BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.data.name, payload.name);
    assert.strictEqual(data.data.email, payload.email);
    assert.strictEqual(data.data.status, 'New');
    createdInquiryId = data.data._id;
    assert.ok(createdInquiryId, 'Inquiry should have an ID');
  });

  // TC-V1-006: Validation Error on Missing Required Fields
  await test('TC-V1-006: POST /inquiries rejects missing name/email with 400', async () => {
    const payload = { tradition: 'Cross Cultural' };
    const res = await fetch(`${BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    assert.strictEqual(res.status, 400, `Expected 400, got ${res.status}`);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  // TC-V1-007: List All Inquiries
  await test('TC-V1-007: GET /inquiries returns inquiry list', async () => {
    const res = await fetch(`${BASE_URL}/inquiries`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.data.length > 0, 'Should have at least 1 inquiry');
  });

  // TC-V1-008: Get Inquiry by ID
  await test('TC-V1-008: GET /inquiries/:id retrieves specific inquiry', async () => {
    assert.ok(createdInquiryId, 'createdInquiryId must exist');
    const res = await fetch(`${BASE_URL}/inquiries/${createdInquiryId}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.data._id, createdInquiryId);
  });

  // TC-V1-009: Update Inquiry Status
  await test('TC-V1-009: PATCH /inquiries/:id updates consultation status', async () => {
    assert.ok(createdInquiryId, 'createdInquiryId must exist');
    const res = await fetch(`${BASE_URL}/inquiries/${createdInquiryId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Consultation Scheduled', internalNotes: 'Verified via v1 automated test' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.data.status, 'Consultation Scheduled');
  });

  // TC-V1-010: Filter Inquiries by Status
  await test('TC-V1-010: GET /inquiries?status=Consultation+Scheduled filters list', async () => {
    const res = await fetch(`${BASE_URL}/inquiries?status=Consultation%20Scheduled`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.data.every(i => i.status === 'Consultation Scheduled'), 'All returned records must match status');
  });

  console.log('\n------------------------------------------------------');
  console.log(` 📊 v1.0 SUMMARY: Passed: ${passed} | Failed: ${failed} | Total: ${passed + failed}`);
  console.log('------------------------------------------------------\n');

  if (failed > 0) {
    throw new Error(`v1.0 Test suite finished with ${failed} failure(s)`);
  }
}

if (require.main === module) {
  runV1Tests().catch(err => {
    console.error(err.message);
    process.exit(1);
  });
}

module.exports = runV1Tests;
