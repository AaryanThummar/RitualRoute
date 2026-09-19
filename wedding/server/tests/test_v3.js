/**
 * TEST SUITE: VERSION 3.0 (Enterprise Wedding Management Tier)
 * Tests: Guests & RSVP Ledger, Dual-Tradition Smart Budget Calculator, Multi-Ceremony Checklist, Full E2E Flow
 */

const assert = require('assert');

const BASE_URL = process.env.TEST_BASE_URL_V3 || 'http://localhost:5000/api/v3';

async function runV3Tests() {
  console.log('\n======================================================');
  console.log(' 🧪 RUNNING TEST SUITE: VERSION 3.0 (Full Management)');
  console.log(` 🌐 Base URL: ${BASE_URL}`);
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`  • [v3.0] ${name}... `);
      await fn();
      console.log('✅ PASSED');
      passed++;
    } catch (err) {
      console.log(`❌ FAILED: ${err.message}`);
      failed++;
    }
  }

  // TC-V3-001: Health Check
  await test('TC-V3-001: Health Check returns v3.0.0 metadata', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'online');
    assert.strictEqual(data.version, '3.0.0');
    assert.strictEqual(data.tier, 'Enterprise Wedding Management');
    assert.ok(data.endpoints.includes('/api/v3/guests'));
    assert.ok(data.endpoints.includes('/api/v3/budget'));
    assert.ok(data.endpoints.includes('/api/v3/checklist'));
  });

  // TC-V3-002: Add Multi-Cultural Guest
  let createdGuestId = null;
  await test('TC-V3-002: POST /guests creates RSVP with dietary & culture tag', async () => {
    const payload = {
      name: 'Uncle Harpreet & Family',
      side: 'Bride',
      culture: 'Punjabi',
      email: 'harpreet@family.com',
      phone: '+91 98111 22233',
      status: 'Pending',
      dietary: 'Pure Vegetarian',
      invitedEvents: ['Maiya & Chooda', 'Anand Karaj', 'Grand Reception'],
      plusOne: true
    };
    const res = await fetch(`${BASE_URL}/guests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.data.side, 'Bride');
    assert.strictEqual(data.data.culture, 'Punjabi');
    createdGuestId = data.data._id;
    assert.ok(createdGuestId);
  });

  // TC-V3-003: Filter Guests by Family Side
  await test('TC-V3-003: GET /guests?side=Bride filters bride side guests', async () => {
    const res = await fetch(`${BASE_URL}/guests?side=Bride`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.data.every(g => g.side === 'Bride'));
  });

  // TC-V3-004: Update Guest Attendance Status
  await test('TC-V3-004: PUT /guests/:id confirms guest RSVP attendance', async () => {
    assert.ok(createdGuestId);
    const res = await fetch(`${BASE_URL}/guests/${createdGuestId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Confirmed', notes: 'Attending with 2 children' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.data.status, 'Confirmed');
  });

  // TC-V3-005: Create Budget Allocation Item
  let createdBudgetId = null;
  await test('TC-V3-005: POST /budget creates dual-tradition expense line', async () => {
    const payload = {
      category: 'Gastronomy',
      item: 'Bespoke South Indian Sadya & Punjabi Dhaba Buffet',
      allocated: 1500000,
      actual: 1420000,
      culturalTag: 'Dual Feast (Tamil & Punjabi)',
      paid: false,
      vendor: 'Royal Heritage Caterers'
    };
    const res = await fetch(`${BASE_URL}/budget`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.data.allocated, 1500000);
    createdBudgetId = data.data._id;
  });

  // TC-V3-006: Budget Calculations & Mathematical Variance
  await test('TC-V3-006: GET /budget computes totalAllocated, totalActual, balance', async () => {
    const res = await fetch(`${BASE_URL}/budget`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.summary, 'Summary must be present');
    assert.strictEqual(typeof data.summary.totalAllocated, 'number');
    assert.strictEqual(typeof data.summary.totalActual, 'number');
    assert.strictEqual(data.summary.balance, data.summary.totalAllocated - data.summary.totalActual);
  });

  // TC-V3-007: Update Budget Item (Mark Paid)
  await test('TC-V3-007: PUT /budget/:id marks expense paid', async () => {
    assert.ok(createdBudgetId);
    const res = await fetch(`${BASE_URL}/budget/${createdBudgetId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paid: true, actual: 1420000 })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.data.paid, true);
  });

  // TC-V3-008: Create Multi-Ceremony Checklist Task
  let createdTaskId = null;
  await test('TC-V3-008: POST /checklist creates milestone planning task', async () => {
    const payload = {
      task: 'Finalize Nadaswaram and Dhol player coordination for entrance',
      timeline: '2 Months Before',
      category: 'Music & Performance',
      ceremonyTag: 'Dual Arrival',
      assignedTo: 'Wedding Concierge',
      completed: false
    };
    const res = await fetch(`${BASE_URL}/checklist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.data.completed, false);
    createdTaskId = data.data._id;
  });

  // TC-V3-009: Complete Milestone Task
  await test('TC-V3-009: PUT /checklist/:id toggles task completion status', async () => {
    assert.ok(createdTaskId);
    const res = await fetch(`${BASE_URL}/checklist/${createdTaskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.data.completed, true);
  });

  // TC-V3-010: Query Completed Checklist Tasks
  await test('TC-V3-010: GET /checklist?completed=true filters finished milestones', async () => {
    const res = await fetch(`${BASE_URL}/checklist?completed=true`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.data.every(t => t.completed === true));
  });

  // TC-V3-011: Complete End-to-End Enterprise Flow
  await test('TC-V3-011: End-to-End Lifecycle (Inquiry -> Board -> RSVP -> Budget -> Task)', async () => {
    // 1. Submit Inquiry
    const inq = await (await fetch(`${BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'E2E Couple', email: 'e2e@heritage.com', tradition: 'Parsi + Bengali' })
    })).json();
    assert.strictEqual(inq.success, true);

    // 2. Generate Curation Board
    const board = await (await fetch(`${BASE_URL}/curation/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bride: { religion: 'Parsi', community: 'Parsi' },
        groom: { religion: 'Hindu', community: 'Bengali' }
      })
    })).json();
    assert.strictEqual(board.success, true);
    assert.strictEqual(board.data.curation.isFusion, true);

    // 3. Register Guest
    const guest = await (await fetch(`${BASE_URL}/guests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'E2E Guest', side: 'Both', status: 'Confirmed' })
    })).json();
    assert.strictEqual(guest.success, true);

    // 4. Log Budget Item
    const budget = await (await fetch(`${BASE_URL}/budget`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: 'Achu Michu & Shubho Drishti Stage Decor', allocated: 800000 })
    })).json();
    assert.strictEqual(budget.success, true);

    // Clean up created test items
    if (guest.data._id) await fetch(`${BASE_URL}/guests/${guest.data._id}`, { method: 'DELETE' });
    if (budget.data._id) await fetch(`${BASE_URL}/budget/${budget.data._id}`, { method: 'DELETE' });
    if (createdGuestId) await fetch(`${BASE_URL}/guests/${createdGuestId}`, { method: 'DELETE' });
    if (createdBudgetId) await fetch(`${BASE_URL}/budget/${createdBudgetId}`, { method: 'DELETE' });
    if (createdTaskId) await fetch(`${BASE_URL}/checklist/${createdTaskId}`, { method: 'DELETE' });
  });

  console.log('\n------------------------------------------------------');
  console.log(` 📊 v3.0 SUMMARY: Passed: ${passed} | Failed: ${failed} | Total: ${passed + failed}`);
  console.log('------------------------------------------------------\n');

  if (failed > 0) {
    throw new Error(`v3.0 Test suite finished with ${failed} failure(s)`);
  }
}

if (require.main === module) {
  runV3Tests().catch(err => {
    console.error(err.message);
    process.exit(1);
  });
}

module.exports = runV3Tests;
