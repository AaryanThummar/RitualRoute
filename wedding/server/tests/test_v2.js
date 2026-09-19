/**
 * TEST SUITE: VERSION 2.0 (Intelligence & Coordination Tier)
 * Tests: AI Curation Engine, Dual-Protocol Synthesis, Bcrypt & JWT Auth, Access Control
 */

const assert = require('assert');

const BASE_URL = process.env.TEST_BASE_URL_V2 || 'http://localhost:5000/api/v2';

async function runV2Tests() {
  console.log('\n======================================================');
  console.log(' 🧪 RUNNING TEST SUITE: VERSION 2.0 (AI Curation & Auth)');
  console.log(` 🌐 Base URL: ${BASE_URL}`);
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`  • [v2.0] ${name}... `);
      await fn();
      console.log('✅ PASSED');
      passed++;
    } catch (err) {
      console.log(`❌ FAILED: ${err.message}`);
      failed++;
    }
  }

  // TC-V2-001: Health Check
  await test('TC-V2-001: Health Check returns v2.0.0 metadata', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'online');
    assert.strictEqual(data.version, '2.0.0');
    assert.strictEqual(data.tier, 'Intelligence & Coordination');
    assert.ok(data.endpoints.includes('/api/v2/curation'), 'Should expose curation endpoint');
    assert.ok(data.endpoints.includes('/api/v2/auth'), 'Should expose auth endpoint');
  });

  // TC-V2-002: AI Curation Engine - Fusion Wedding Generation
  let generatedShareId = null;
  await test('TC-V2-002: POST /curation/generate synthesizes dual-protocol fusion plan', async () => {
    const payload = {
      bride: { religion: 'Hindu', community: 'Tamil', state: 'Tamil Nadu', language: 'Tamil' },
      groom: { religion: 'Sikh', community: 'Punjabi', state: 'Punjab', language: 'Punjabi' },
      prefs: { budget: '₹1–3 Cr (Luxury)', guests: '250–500', venue: 'Heritage Palace', decor: 'Jasmine & Lotus', food: 'Fusion' }
    };
    const res = await fetch(`${BASE_URL}/curation/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.data.shareId, 'Should generate shareId');
    generatedShareId = data.data.shareId;

    const c = data.data.curation;
    assert.strictEqual(c.isFusion, true, 'Should detect fusion wedding');
    assert.ok(c.weddingType.includes('Fusion'), 'Title should state Fusion');
    assert.ok(c.ceremony.timeline.length >= 4, 'Timeline should have multi-stage ceremonies');
    assert.ok(c.decor.palette.includes('Gold'), 'Decor should have synthesized palette');
    assert.ok(c.cuisine.highlights.length >= 3, 'Cuisine should have menu highlights');
    assert.ok(c.venue.recommendations.length >= 2, 'Should offer venue recommendations');
  });

  // TC-V2-003: AI Curation Engine - Single-Culture Traditional Plan
  await test('TC-V2-003: POST /curation/generate generates pure traditional plan when traditions match', async () => {
    const payload = {
      bride: { religion: 'Hindu', community: 'Bengali', state: 'West Bengal', language: 'Bengali' },
      groom: { religion: 'Hindu', community: 'Bengali', state: 'West Bengal', language: 'Bengali' },
      prefs: { budget: '₹50L–1 Cr (Premium)', guests: '100–250' }
    };
    const res = await fetch(`${BASE_URL}/curation/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.data.curation.isFusion, false, 'Should detect traditional wedding');
    assert.ok(data.data.curation.weddingType.includes('Traditional Bengali'), 'Should be Traditional Bengali');
  });

  // TC-V2-004: Validation on Missing Profiles
  await test('TC-V2-004: POST /curation/generate rejects missing bride or groom with 400', async () => {
    const res = await fetch(`${BASE_URL}/curation/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefs: { budget: '₹1 Cr' } })
    });
    assert.strictEqual(res.status, 400);
  });

  // TC-V2-005: Retrieve Board by shareId
  await test('TC-V2-005: GET /curation/:id retrieves persisted board', async () => {
    assert.ok(generatedShareId, 'generatedShareId must exist');
    const res = await fetch(`${BASE_URL}/curation/${generatedShareId}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.data.shareId, generatedShareId);
  });

  // TC-V2-006: Register Couple User Account
  const testEmail = `couple.v2.${Date.now()}@test.com`;
  let authToken = null;
  await test('TC-V2-006: POST /auth/register creates couple account & issues JWT', async () => {
    const payload = {
      name: 'Rohan & Meera',
      email: testEmail,
      password: 'SecurePassword@123',
      role: 'couple',
      partnerName: 'Meera',
      traditions: ['Punjabi', 'Tamil']
    };
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.token, 'Must return JWT token');
    assert.strictEqual(data.user.email, testEmail);
    authToken = data.token;
  });

  // TC-V2-007: Reject Duplicate Registration
  await test('TC-V2-007: POST /auth/register rejects duplicate email with 400', async () => {
    const payload = {
      name: 'Duplicate User',
      email: testEmail,
      password: 'Password@123'
    };
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    assert.strictEqual(res.status, 400);
  });

  // TC-V2-008: Login with Valid Credentials
  await test('TC-V2-008: POST /auth/login authenticates user & returns JWT', async () => {
    const payload = {
      email: testEmail,
      password: 'SecurePassword@123'
    };
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.token, 'Must return token');
  });

  // TC-V2-009: Reject Invalid Password
  await test('TC-V2-009: POST /auth/login rejects wrong password with 401', async () => {
    const payload = {
      email: testEmail,
      password: 'WrongPassword!999'
    };
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    assert.strictEqual(res.status, 401);
  });

  // TC-V2-010: Protected Route Access with Bearer Token
  await test('TC-V2-010: GET /auth/me returns authenticated user profile', async () => {
    assert.ok(authToken, 'authToken must exist');
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.user.email, testEmail);
  });

  // TC-V2-011: Reject Protected Route Without Token
  await test('TC-V2-011: GET /auth/me rejects missing token with 401', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`);
    assert.strictEqual(res.status, 401);
  });

  console.log('\n------------------------------------------------------');
  console.log(` 📊 v2.0 SUMMARY: Passed: ${passed} | Failed: ${failed} | Total: ${passed + failed}`);
  console.log('------------------------------------------------------\n');

  if (failed > 0) {
    throw new Error(`v2.0 Test suite finished with ${failed} failure(s)`);
  }
}

if (require.main === module) {
  runV2Tests().catch(err => {
    console.error(err.message);
    process.exit(1);
  });
}

module.exports = runV2Tests;
