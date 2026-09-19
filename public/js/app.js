/**
 * RitualRoute - Client Application Controller
 * Handles state management, REST API synchronization, and dynamic views
 */

// Application State
const state = {
  currentTab: 'dashboard',
  dbMode: 'local_fallback',
  wedding: {},
  rituals: [],
  guests: [],
  budget: [],
  vendors: [],
  tasks: [],
  harmonizedPlan: null
};

// ========================================================
// INITIALIZATION
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  initSystem();
  loadAllData();
});

async function initSystem() {
  try {
    const res = await fetch('/api/system/status');
    const data = await res.json();
    if (data.success) {
      state.dbMode = data.data.databaseMode;
      state.wedding = data.data.wedding || {};
      updateDbStatusPill(data.data);
      updateHeroDetails();
    }
  } catch (err) {
    console.warn('System status check failed:', err);
    updateDbStatusPill({ databaseMode: 'local_fallback', databaseProvider: 'Local DB' });
  }
}

function updateDbStatusPill(info) {
  const badge = document.getElementById('dbStatusBadge');
  const text = document.getElementById('dbStatusText');
  if (!badge || !text) return;

  if (info.databaseMode === 'firebase') {
    badge.className = 'db-status-badge';
    text.textContent = '🟢 Firebase Firestore';
  } else {
    badge.className = 'db-status-badge fallback';
    text.textContent = '🟡 Local DB (Firebase Ready)';
  }
}

function showDbStatusModal() {
  const container = document.getElementById('dbStatusDetails');
  if (!container) return;

  const isFb = state.dbMode === 'firebase';
  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 1.25rem;">
      <div style="font-size: 2.5rem; color: ${isFb ? '#22c55e' : '#f59e0b'};">
        <i class="fa-solid ${isFb ? 'fa-cloud-arrow-up' : 'fa-database'}"></i>
      </div>
      <h4 style="font-family: var(--font-heading); font-size: 1.25rem; margin-top: 8px;">
        ${isFb ? 'Firebase Firestore Cloud Active' : 'Local JSON Fallback Engine Active'}
      </h4>
      <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 4px;">
        ${isFb 
          ? 'Your live data is synchronizing in real-time with Google Cloud Firebase Firestore.' 
          : 'RitualRoute is running locally via data/db.json. It will seamlessly switch to Firebase as soon as you enter your keys in .env!'}
      </p>
    </div>
    <div style="background: var(--bg-creme); border: 1px solid var(--border-card); border-radius: var(--radius-sm); padding: 1rem; font-size: 0.85rem;">
      <div><strong>Current Storage:</strong> ${isFb ? 'Firebase Cloud Firestore' : 'data/db.json (Zero-crash fallback)'}</div>
      <div style="margin-top: 6px;"><strong>Wedding Title:</strong> ${state.wedding.title || 'Aanya & Kabir'}</div>
      <div style="margin-top: 6px;"><strong>Target Deployment:</strong> Render Web Service</div>
      <div style="margin-top: 6px;"><strong>GitHub Repository:</strong> https://github.com/AaryanThummar/RitualRoute.git</div>
    </div>
  `;
  openModal('modal-db-status');
}

function updateHeroDetails() {
  if (!state.wedding) return;
  const w = state.wedding;

  const titleEl = document.getElementById('heroWeddingTitle');
  const dateEl = document.getElementById('heroWeddingDate');
  const venueEl = document.getElementById('heroVenue');
  const culturesEl = document.getElementById('heroCultures');
  const countdownEl = document.getElementById('countdownDays');

  if (titleEl && w.title) titleEl.textContent = w.title;
  if (venueEl && w.venueCity) venueEl.textContent = w.venueCity;
  if (culturesEl && w.culture1 && w.culture2) culturesEl.textContent = `${w.culture1} & ${w.culture2} Blended Celebration`;

  if (dateEl && w.weddingDate) {
    const d = new Date(w.weddingDate);
    dateEl.textContent = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // Calculate days remaining
    const diff = d.getTime() - new Date().getTime();
    const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    if (countdownEl) countdownEl.textContent = days;
  }
}

// ========================================================
// NAVIGATION & TABS
// ========================================================
function switchTab(tabId) {
  state.currentTab = tabId;

  // Update Nav Buttons
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.toLowerCase().includes(tabId.toLowerCase())) {
      btn.classList.add('active');
    }
  });

  // Update View Sections
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const target = document.getElementById(`view-${tabId}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Refresh tab data
  if (tabId === 'harmonizer' && !state.harmonizedPlan) {
    generateHarmonizedTimeline();
  }
}

// ========================================================
// DATA LOADING
// ========================================================
async function loadAllData() {
  await Promise.all([
    loadRituals(),
    loadGuests(),
    loadBudget(),
    loadVendors(),
    loadTasks()
  ]);
  updateDashboardKPIs();
}

// 1. RITUALS
async function loadRituals(culture = 'All') {
  try {
    const url = culture === 'All' ? '/api/rituals' : `/api/rituals?culture=${encodeURIComponent(culture)}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.success) {
      state.rituals = json.data;
      renderRitualsList(json.data);
      renderDashboardRitualsPreview(json.data);
      const kpiEl = document.getElementById('kpiRitualsCount');
      if (kpiEl) kpiEl.textContent = json.data.length;
    }
  } catch (err) {
    console.error('Failed to load rituals:', err);
  }
}

function filterRituals(culture) {
  document.querySelectorAll('#cultureFilterChips .filter-chip').forEach(c => {
    c.classList.remove('active');
    if (c.textContent.trim() === culture || (culture === 'All' && c.textContent.includes('All'))) {
      c.classList.add('active');
    }
  });
  loadRituals(culture);
}

function renderRitualsList(rituals) {
  const container = document.getElementById('ritualsDirectoryGrid');
  if (!container) return;

  if (rituals.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">No rituals found for this selection.</div>`;
    return;
  }

  container.innerHTML = rituals.map(r => {
    const cultureClass = r.culture.toLowerCase();
    const items = r.itemsNeeded && r.itemsNeeded.length ? r.itemsNeeded.slice(0, 4).join(', ') : 'Traditional Samagri';
    const dos = r.dosAndDonts && r.dosAndDonts.dos ? r.dosAndDonts.dos[0] : 'Respect traditions';

    return `
      <div class="ritual-card">
        <div class="ritual-card-header">
          <span class="culture-badge ${cultureClass}">${r.culture}</span>
          <span class="ritual-duration"><i class="fa-regular fa-clock"></i> ${r.durationHours || 1.5} hrs</span>
        </div>
        <h3 class="ritual-name">${r.name}</h3>
        <div class="ritual-subtitle">${r.subtitle || r.typicalDay || 'Wedding Tradition'}</div>
        <p class="ritual-desc">${r.significance || 'Sacred wedding ceremony rich with cultural meaning.'}</p>
        
        <div class="ritual-meta-box">
          <div><strong><i class="fa-solid fa-shirt"></i> Dress Code:</strong> ${r.dressCode || 'Festive Indian / Formal'}</div>
          <div style="margin-top: 6px;"><strong><i class="fa-solid fa-wand-magic"></i> Essential Items:</strong> ${items}</div>
        </div>

        <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-circle-check" style="color: #059669;"></i> <span><strong>Pro Tip:</strong> ${dos}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderDashboardRitualsPreview(rituals) {
  const container = document.getElementById('dashboardRitualsPreview');
  if (!container) return;

  container.innerHTML = rituals.slice(0, 3).map(r => `
    <div class="ritual-card">
      <div class="ritual-card-header">
        <span class="culture-badge ${r.culture.toLowerCase()}">${r.culture}</span>
        <span class="ritual-duration">${r.typicalDay || 'Day 1'}</span>
      </div>
      <h3 class="ritual-name">${r.name}</h3>
      <div class="ritual-subtitle">${r.subtitle || ''}</div>
      <p class="ritual-desc">${r.significance.slice(0, 110)}...</p>
      <button class="btn-outline" style="width: 100%; justify-content: center; margin-top: auto;" onclick="switchTab('rituals')">
        Explore Ceremony Details
      </button>
    </div>
  `).join('');
}

// 2. HARMONIZER
async function generateHarmonizedTimeline() {
  const cultureA = document.getElementById('blendCultureA')?.value || 'Hindu';
  const cultureB = document.getElementById('blendCultureB')?.value || 'Sikh';
  const days = document.getElementById('blendDays')?.value || 2;

  const outputContainer = document.getElementById('harmonizerOutput');
  if (outputContainer) {
    outputContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--gold-primary);"></i>
        <p style="margin-top: 1rem; color: var(--text-muted); font-weight: 600;">Weaving together ${cultureA} and ${cultureB} traditions...</p>
      </div>
    `;
  }

  try {
    const res = await fetch('/api/harmonizer/blend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cultureA, cultureB, days })
    });
    const json = await res.json();
    if (json.success) {
      state.harmonizedPlan = json.data;
      renderHarmonizedOutput(json.data);
      showToast(`Harmonized ${cultureA} & ${cultureB} timeline generated!`, 'success');
    }
  } catch (err) {
    console.error('Harmonizer blend failed:', err);
    showToast('Failed to harmonize traditions', 'error');
  }
}

function renderHarmonizedOutput(plan) {
  const container = document.getElementById('harmonizerOutput');
  if (!container) return;

  const synergiesHtml = plan.synergies.map(s => `
    <li><i class="fa-solid fa-circle-sparkles"></i> <span>${s}</span></li>
  `).join('');

  const daysHtml = plan.timeline.map(day => {
    const eventsHtml = day.events.map(e => `
      <div class="timeline-event-card">
        <div class="event-time-col">
          <span class="time-badge">${e.time}</span>
          <span class="origin-pill">${e.origin}</span>
        </div>
        <div class="event-details-col">
          <h4>${e.title}</h4>
          <p>${e.description}</p>
          <div class="event-attire">
            <i class="fa-solid fa-vest-patches"></i> Suggested Attire: ${e.dressCode}
          </div>
        </div>
      </div>
    `).join('');

    return `
      <div class="timeline-day-block">
        <h3 class="timeline-day-title">
          <i class="fa-solid fa-calendar-day" style="color: var(--gold-primary);"></i> ${day.dayTitle}
        </h3>
        ${eventsHtml}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="synergies-card">
      <h4><i class="fa-solid fa-hand-holding-heart"></i> Cultural Synergy & Etiquette Highlights</h4>
      <ul class="synergies-list">${synergiesHtml}</ul>
    </div>

    <div style="margin-top: 2rem;">
      ${daysHtml}
    </div>
  `;
}

// 3. GUESTS & RSVP
async function loadGuests() {
  const side = document.getElementById('guestSideFilter')?.value || 'All';
  const rsvp = document.getElementById('guestRsvpFilter')?.value || 'All';
  const search = document.getElementById('guestSearchInput')?.value || '';

  try {
    let url = `/api/guests?side=${encodeURIComponent(side)}&rsvp=${encodeURIComponent(rsvp)}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const res = await fetch(url);
    const json = await res.json();
    if (json.success) {
      state.guests = json.data;
      renderGuestsTable(json.data);
    }

    // Also fetch stats
    const statsRes = await fetch('/api/guests/stats');
    const statsJson = await statsRes.json();
    if (statsJson.success) {
      renderGuestStats(statsJson.data);
    }
  } catch (err) {
    console.error('Failed to load guests:', err);
  }
}

function renderGuestsTable(guests) {
  const tbody = document.getElementById('guestsTableBody');
  if (!tbody) return;

  if (guests.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">No guests found matching filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = guests.map(g => {
    const sideClass = (g.side || 'mutual').toLowerCase();
    const rsvpClass = (g.rsvpStatus || 'pending').toLowerCase();
    const ceremonies = (g.ceremoniesAttending || []).map(c => `
      <span style="display:inline-block; font-size:0.72rem; background:#f4eee6; padding:2px 6px; border-radius:4px; margin:2px;">${c}</span>
    `).join('');

    return `
      <tr>
        <td>
          <div style="font-weight: 700; color: var(--text-main);">${g.name}</div>
          <div style="font-size: 0.78rem; color: var(--text-light);">${g.relationship || ''} &bull; ${g.email || ''}</div>
        </td>
        <td><span class="side-badge ${sideClass}">${g.side}</span></td>
        <td><span class="rsvp-pill ${rsvpClass}">${g.rsvpStatus}</span></td>
        <td><span class="diet-badge"><i class="fa-solid fa-bowl-food"></i> ${g.dietary || 'Standard'}</span></td>
        <td>${ceremonies}</td>
        <td><span style="font-size: 0.8rem; font-weight: 600;">${g.tableNumber || 'TBD'}</span></td>
        <td>
          <button class="btn-outline" style="padding: 4px 8px; font-size: 0.75rem; color: #dc2626;" onclick="deleteGuest('${g.id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderGuestStats(stats) {
  const confirmedEl = document.getElementById('guestCountConfirmed');
  const pendingEl = document.getElementById('guestCountPending');
  const dietaryEl = document.getElementById('guestDietaryCount');

  const kpiConfirmed = document.getElementById('kpiConfirmedGuests');
  const kpiHeadcount = document.getElementById('kpiTotalHeadcount');

  if (confirmedEl) confirmedEl.textContent = stats.confirmed;
  if (pendingEl) pendingEl.textContent = stats.pending;
  if (kpiConfirmed) kpiConfirmed.textContent = stats.confirmed;
  if (kpiHeadcount) kpiHeadcount.textContent = `Total Headcount: ${stats.totalHeadcount}`;

  if (dietaryEl) {
    const specialCount = (stats.dietaryBreakdown['Jain (Strict)'] || 0) + 
                         (stats.dietaryBreakdown['Halal'] || 0) + 
                         (stats.dietaryBreakdown['Vegan'] || 0);
    dietaryEl.textContent = specialCount;
  }
}

function handleGuestSearch() {
  loadGuests();
}

async function deleteGuest(id) {
  if (!confirm('Remove this guest from the wedding invitation list?')) return;
  try {
    const res = await fetch(`/api/guests/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      showToast('Guest removed successfully', 'success');
      loadGuests();
    }
  } catch (err) {
    showToast('Failed to delete guest', 'error');
  }
}

// 4. BUDGET & EXPENSES
async function loadBudget() {
  const category = document.getElementById('budgetCategoryFilter')?.value || 'All';
  try {
    const url = category === 'All' ? '/api/budget' : `/api/budget?category=${encodeURIComponent(category)}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.success) {
      state.budget = json.data;
      renderBudgetTable(json.data);
    }

    const summaryRes = await fetch('/api/budget/summary');
    const summaryJson = await summaryRes.json();
    if (summaryJson.success) {
      renderBudgetSummary(summaryJson.data);
    }
  } catch (err) {
    console.error('Failed to load budget:', err);
  }
}

function renderBudgetTable(items) {
  const tbody = document.getElementById('budgetTableBody');
  if (!tbody) return;

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">No expenses found.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(item => {
    const statusClass = (item.status || 'Pending').toLowerCase();
    return `
      <tr>
        <td>
          <div style="font-weight: 700;">${item.title}</div>
          <div style="font-size: 0.78rem; color: var(--text-light);">${item.notes || ''}</div>
        </td>
        <td><span class="diet-badge">${item.category}</span></td>
        <td><strong style="color: var(--primary-burgundy);">${item.vendor || 'TBD'}</strong></td>
        <td><strong>₹${Number(item.actualCost || item.estimatedCost).toLocaleString('en-IN')}</strong></td>
        <td style="color: #059669; font-weight: 700;">₹${Number(item.paidAmount || 0).toLocaleString('en-IN')}</td>
        <td><span class="rsvp-pill ${statusClass}">${item.status}</span></td>
        <td>
          <button class="btn-outline" style="padding: 4px 8px; font-size: 0.75rem; color: #dc2626;" onclick="deleteBudgetItem('${item.id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderBudgetSummary(summary) {
  const totalDisplay = document.getElementById('budgetTotalDisplay');
  const spentDisplay = document.getElementById('budgetSpentDisplay');
  const pendingDisplay = document.getElementById('budgetPendingDisplay');
  const remainingDisplay = document.getElementById('budgetRemainingDisplay');
  const bar = document.getElementById('budgetProgressBar');

  const kpiSpent = document.getElementById('kpiBudgetSpent');
  const kpiRemaining = document.getElementById('kpiBudgetRemaining');

  if (totalDisplay) totalDisplay.textContent = `₹${summary.overallBudget.toLocaleString('en-IN')}`;
  if (spentDisplay) spentDisplay.textContent = `₹${summary.totalPaid.toLocaleString('en-IN')}`;
  if (pendingDisplay) pendingDisplay.textContent = `₹${summary.pendingBalance.toLocaleString('en-IN')}`;
  if (remainingDisplay) remainingDisplay.textContent = `₹${summary.budgetRemaining.toLocaleString('en-IN')}`;

  if (bar) bar.style.width = `${Math.min(100, summary.percentSpent)}%`;

  if (kpiSpent) kpiSpent.textContent = `₹${(summary.totalPaid / 100000).toFixed(1)} Lakh`;
  if (kpiRemaining) kpiRemaining.textContent = `Remaining: ₹${(summary.budgetRemaining / 100000).toFixed(1)} Lakh`;
}

async function deleteBudgetItem(id) {
  if (!confirm('Delete this expense line item?')) return;
  try {
    const res = await fetch(`/api/budget/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      showToast('Expense item deleted', 'success');
      loadBudget();
    }
  } catch (err) {
    showToast('Failed to delete expense', 'error');
  }
}

// 5. VENDORS
async function loadVendors() {
  const category = document.getElementById('vendorCategoryFilter')?.value || 'All';
  const search = document.getElementById('vendorSearchInput')?.value || '';

  try {
    let url = `/api/vendors?category=${encodeURIComponent(category)}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const res = await fetch(url);
    const json = await res.json();
    if (json.success) {
      state.vendors = json.data;
      renderVendorsList(json.data);
    }
  } catch (err) {
    console.error('Failed to load vendors:', err);
  }
}

function handleVendorSearch() {
  loadVendors();
}

function renderVendorsList(vendors) {
  const container = document.getElementById('vendorsGrid');
  if (!container) return;

  if (vendors.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">No specialized vendors found for this search.</div>`;
    return;
  }

  container.innerHTML = vendors.map(v => `
    <div class="ritual-card">
      <div class="ritual-card-header">
        <span class="diet-badge">${v.category}</span>
        <span style="font-weight: 700; color: #d97706; font-size: 0.88rem;">
          <i class="fa-solid fa-star"></i> ${v.rating || 5.0}
        </span>
      </div>
      <h3 class="ritual-name">${v.name}</h3>
      <div class="ritual-subtitle">${v.specialty}</div>
      <p class="ritual-desc">${v.description || 'Experienced in high-touch cultural celebrations.'}</p>
      
      <div class="ritual-meta-box">
        <div><strong><i class="fa-solid fa-location-dot"></i> Service Area:</strong> ${v.city}</div>
        <div style="margin-top: 4px;"><strong><i class="fa-solid fa-tag"></i> Estimated Investment:</strong> ${v.priceRange}</div>
      </div>

      <a href="tel:${v.phone}" class="btn-primary" style="text-decoration: none; text-align: center; justify-content: center;">
        <i class="fa-solid fa-phone"></i> Inquire / Call (${v.phone})
      </a>
    </div>
  `).join('');
}

// 6. TASKS
async function loadTasks() {
  try {
    const res = await fetch('/api/tasks');
    const json = await res.json();
    if (json.success) {
      state.tasks = json.data;
      renderTasksList(json.data);
      updateTaskKPIs(json.data);
    }
  } catch (err) {
    console.error('Failed to load tasks:', err);
  }
}

function renderTasksList(tasks) {
  const container = document.getElementById('tasksListContainer');
  if (!container) return;

  if (tasks.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--text-muted);">No checklist tasks added yet.</div>`;
    return;
  }

  container.innerHTML = tasks.map(t => {
    const priClass = (t.priority || 'medium').toLowerCase();
    const isDone = Boolean(t.completed);

    return `
      <div class="task-item-row">
        <div class="task-left">
          <input type="checkbox" class="task-checkbox" ${isDone ? 'checked' : ''} onchange="toggleTask('${t.id}', this.checked)">
          <div>
            <div class="task-title-text ${isDone ? 'completed' : ''}">${t.title}</div>
            <div style="font-size: 0.78rem; color: var(--text-light); display: flex; gap: 8px; align-items: center; margin-top: 2px;">
              <span><i class="fa-regular fa-clock"></i> ${t.timeline}</span>
              <span>&bull;</span>
              <span><i class="fa-solid fa-user-tag"></i> ${t.assignedTo || 'Team'}</span>
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="task-pill ${priClass}">${t.priority}</span>
          <button class="btn-outline" style="padding: 4px 8px; font-size: 0.75rem; color: #dc2626;" onclick="deleteTask('${t.id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function toggleTask(id, completed) {
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    const json = await res.json();
    if (json.success) {
      showToast(completed ? 'Task marked complete!' : 'Task reopened', 'success');
      loadTasks();
    }
  } catch (err) {
    showToast('Failed to update task', 'error');
  }
}

async function deleteTask(id) {
  if (!confirm('Remove this task from the checklist?')) return;
  try {
    const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      showToast('Task removed', 'success');
      loadTasks();
    }
  } catch (err) {
    showToast('Failed to delete task', 'error');
  }
}

function updateTaskKPIs(tasks) {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const pctEl = document.getElementById('kpiTaskProgress');
  const countEl = document.getElementById('kpiTaskCount');

  if (pctEl) pctEl.textContent = `${pct}%`;
  if (countEl) countEl.textContent = `${completed} of ${total} Completed`;
}

function updateDashboardKPIs() {
  // Handled inside individual load routines
}

// ========================================================
// FORM SUBMISSIONS
// ========================================================
async function submitGuestForm(e) {
  e.preventDefault();
  const guestData = {
    name: document.getElementById('guestInputName').value,
    side: document.getElementById('guestInputSide').value,
    relationship: document.getElementById('guestInputRel').value,
    rsvpStatus: document.getElementById('guestInputRsvp').value,
    dietary: document.getElementById('guestInputDietary').value,
    plusOnes: Number(document.getElementById('guestInputPlusOnes').value) || 0,
    tableNumber: document.getElementById('guestInputTable').value,
    ceremoniesAttending: document.getElementById('guestInputCeremonies').value.split(',').map(s => s.trim())
  };

  try {
    const res = await fetch('/api/guests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(guestData)
    });
    const json = await res.json();
    if (json.success) {
      showToast(`Guest ${guestData.name} added to invite list!`, 'success');
      closeModal('modal-guest');
      document.getElementById('formAddGuest').reset();
      loadGuests();
    } else {
      showToast(json.message || 'Error adding guest', 'error');
    }
  } catch (err) {
    showToast('Network error saving guest', 'error');
  }
}

async function submitBudgetForm(e) {
  e.preventDefault();
  const budgetData = {
    title: document.getElementById('budgetInputTitle').value,
    category: document.getElementById('budgetInputCategory').value,
    vendor: document.getElementById('budgetInputVendor').value,
    estimatedCost: Number(document.getElementById('budgetInputEst').value) || 0,
    actualCost: Number(document.getElementById('budgetInputEst').value) || 0,
    paidAmount: Number(document.getElementById('budgetInputPaid').value) || 0,
    notes: document.getElementById('budgetInputNotes').value
  };

  try {
    const res = await fetch('/api/budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(budgetData)
    });
    const json = await res.json();
    if (json.success) {
      showToast(`Expense ${budgetData.title} logged!`, 'success');
      closeModal('modal-budget');
      document.getElementById('formAddBudget').reset();
      loadBudget();
    }
  } catch (err) {
    showToast('Network error saving budget item', 'error');
  }
}

async function submitTaskForm(e) {
  e.preventDefault();
  const taskData = {
    title: document.getElementById('taskInputTitle').value,
    timeline: document.getElementById('taskInputTimeline').value,
    priority: document.getElementById('taskInputPriority').value,
    assignedTo: document.getElementById('taskInputAssigned').value,
    completed: false
  };

  try {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    const json = await res.json();
    if (json.success) {
      showToast('Checklist task added!', 'success');
      closeModal('modal-task');
      document.getElementById('formAddTask').reset();
      loadTasks();
    }
  } catch (err) {
    showToast('Network error saving task', 'error');
  }
}

async function submitRitualForm(e) {
  e.preventDefault();
  const ritualData = {
    name: document.getElementById('ritualInputName').value,
    culture: document.getElementById('ritualInputCulture').value,
    typicalDay: document.getElementById('ritualInputTiming').value,
    significance: document.getElementById('ritualInputSignificance').value,
    dressCode: document.getElementById('ritualInputDress').value
  };

  try {
    const res = await fetch('/api/rituals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ritualData)
    });
    const json = await res.json();
    if (json.success) {
      showToast(`Ritual ${ritualData.name} saved!`, 'success');
      closeModal('modal-ritual');
      document.getElementById('formAddRitual').reset();
      loadRituals();
    }
  } catch (err) {
    showToast('Network error saving ritual', 'error');
  }
}

// ========================================================
// MODAL & TOAST HELPERS
// ========================================================
function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add('active');
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove('active');
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}" style="color: ${type === 'success' ? '#22c55e' : '#ef4444'};"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
