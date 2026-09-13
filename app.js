let appState = {
  title: '',
  phase: 'Phase 1: Intake',
  turn: 1,
  ap: 4,
  strikes: 0,
  undos: 3,
  judge: '',
  pros: '',
  client: '',
  notes: '',
  facts: [],
  docket: []
};

let currentLang = localStorage.getItem('ryc_lang') || 'en';

// ================= INITIALIZATION & STORAGE =================
function initApp() {
  const savedLang = localStorage.getItem('ryc_lang');
  if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
    currentLang = savedLang;
  }
  applyLanguage();
  loadSystemPrompt();

  const savedState = localStorage.getItem('ryc_unified_state');
  if (savedState) {
    try {
      appState = { ...appState, ...JSON.parse(savedState) };
    } catch (e) {
      console.error('Failed to parse local storage state:', e);
    }
  }
  renderTracker();
}

function saveTrackerState() {
  const titleEl = document.getElementById('track-title');
  const phaseEl = document.getElementById('track-phase');
  const notesEl = document.getElementById('attorney-notes');

  if (titleEl) appState.title = titleEl.value;
  if (phaseEl) appState.phase = phaseEl.value;
  if (notesEl) appState.notes = notesEl.value;

  localStorage.setItem('ryc_unified_state', JSON.stringify(appState));
}

// ================= LOCALIZATION ENGINE =================
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  localStorage.setItem('ryc_lang', currentLang);
  applyLanguage();
  renderTracker();
}

function applyLanguage() {
  const root = document.getElementById('html-root');
  const langBtn = document.getElementById('lang-btn');

  if (root) {
    root.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    root.setAttribute('lang', currentLang);
  }

  if (langBtn) {
    langBtn.innerText = currentLang === 'ar' ? 'English' : 'العربية';
  }

  const dict = typeof translations !== 'undefined' ? translations[currentLang] : null;
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerText = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  const titleEl = document.querySelector('title[data-i18n="page_title"]');
  if (titleEl && dict.page_title) {
    document.title = dict.page_title;
  }

  const phaseSelect = document.getElementById('track-phase');
  if (phaseSelect) {
    const phaseKeys = [
      { val: 'Phase 1: Intake', key: 'phase_1' },
      { val: 'Phase 2: Pre-Trial (Diaz)', key: 'phase_2' },
      { val: 'Phase 2.5: Motions', key: 'phase_2_5' },
      { val: 'Phase 3: Trial', key: 'phase_3' },
      { val: 'Phase 3.5: Case-in-Chief', key: 'phase_3_5' },
      { val: 'Phase 4: Verdict', key: 'phase_4' }
    ];
    Array.from(phaseSelect.options).forEach((opt, idx) => {
      if (phaseKeys[idx] && dict[phaseKeys[idx].key]) {
        opt.innerText = dict[phaseKeys[idx].key];
      }
    });
  }
}

// ================= SYSTEM PROMPT FETCH =================
async function loadSystemPrompt() {
  const container = document.getElementById('master-prompt-text');
  if (!container) return;

  try {
    const response = await fetch('./SYSTEM_PROMPT.md');
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const markdown = await response.text();
    container.innerText = markdown;
  } catch (err) {
    const dict = typeof translations !== 'undefined' ? translations[currentLang] : null;
    const fallbackMsg = currentLang === 'ar'
      ? `فشل تحميل ملف SYSTEM_PROMPT.md.\nتأكد من وجود الملف في المسار الرئيسي وتشغيل الموقع عبر خادم محلي.\n\nالتفاصيل: ${err.message}`
      : `Failed to load SYSTEM_PROMPT.md.\nEnsure the file exists in the repository root and is served via an HTTP server.\n\nDetails: ${err.message}`;

    container.innerText = fallbackMsg;
    container.classList.remove('text-emerald-400');
    container.classList.add('text-rose-400');
  }
}

// ================= NAVIGATION & TABS =================
function toggleNavDrawer() {
  const drawer = document.getElementById('nav-drawer');
  const backdrop = document.getElementById('nav-drawer-backdrop');
  if (drawer) drawer.classList.toggle(currentLang === 'ar' ? 'translate-x-full' : '-translate-x-full');
  if (backdrop) backdrop.classList.toggle('hidden');
}

function switchTab(tabId) {
  const tabs = ['dossier', 'setup', 'tracker', 'howtoplay', 'legal'];
  tabs.forEach((t) => {
    const view = document.getElementById(`tab-${t}`);
    const btn = document.getElementById(`tab-${t}-btn`);
    if (view) view.classList.toggle('hidden', t !== tabId);
    if (btn) {
      btn.className = (t === tabId)
        ? 'w-full text-start px-3 py-2.5 rounded bg-brand-border text-white border border-brand-gold/40 transition'
        : 'w-full text-start px-3 py-2.5 rounded text-brand-muted hover:text-white hover:bg-brand-surface transition';
    }
  });
}

function navToTab(tabId) {
  switchTab(tabId);
  toggleNavDrawer();
  if (tabId === 'tracker') renderTracker();
}

function startTracker() {
  switchTab('tracker');
  renderTracker();
}

function copyPrompt() {
  const container = document.getElementById('master-prompt-text');
  if (!container) return;

  navigator.clipboard.writeText(container.innerText).then(() => {
    const btn = document.getElementById('copy-prompt-btn');
    if (!btn) return;
    const originalText = btn.innerText;
    btn.innerText = currentLang === 'ar' ? 'تم النسخ!' : 'Copied!';
    btn.classList.add('bg-white');
    setTimeout(() => {
      btn.innerText = originalText;
      btn.classList.remove('bg-white');
    }, 2000);
  });
}

// ================= TRACKER CONTROLS =================
function adjStat(stat, delta) {
  if (typeof appState[stat] === 'number') {
    appState[stat] += delta;
    if (appState[stat] < 0) appState[stat] = 0;
    saveTrackerState();
    renderTracker();
  }
}

function addFact(customText) {
  const input = document.getElementById('new-fact-input');
  const val = (customText || (input ? input.value : '')).trim();
  if (val) {
    if (!appState.facts.some((f) => f.text.toLowerCase() === val.toLowerCase())) {
      appState.facts.push({ id: Date.now() + Math.random(), text: val });
    }
    if (!customText && input) input.value = '';
    saveTrackerState();
    renderTracker();
  }
}

function deleteFact(id) {
  appState.facts = appState.facts.filter((f) => f.id !== id);
  saveTrackerState();
  renderTracker();
}

function openAddExhibitModal() {
  const modal = document.getElementById('exhibit-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeAddExhibitModal() {
  const modal = document.getElementById('exhibit-modal');
  if (modal) modal.classList.add('hidden');
  const tag = document.getElementById('modal-tag');
  const title = document.getElementById('modal-title');
  const details = document.getElementById('modal-details');
  if (tag) tag.value = '';
  if (title) title.value = '';
  if (details) details.value = '';
}

function saveNewExhibit() {
  const tagInput = document.getElementById('modal-tag');
  const titleInput = document.getElementById('modal-title');
  const detailsInput = document.getElementById('modal-details');

  const defaultTag = currentLang === 'ar' ? `دليل ${appState.docket.length + 1}` : `Ex. ${appState.docket.length + 1}`;
  const defaultTitle = currentLang === 'ar' ? 'عنصر إثبات' : 'Evidence Item';

  appState.docket.push({
    id: Date.now() + Math.random(),
    tag: (tagInput && tagInput.value.trim()) || defaultTag,
    title: (titleInput && titleInput.value.trim()) || defaultTitle,
    details: detailsInput ? detailsInput.value.trim() : '',
    status: 'Admitted'
  });

  saveTrackerState();
  closeAddExhibitModal();
  renderTracker();
}

function setExhibitStatus(id, newStatus) {
  const ex = appState.docket.find((e) => e.id === id);
  if (ex) {
    ex.status = newStatus;
    saveTrackerState();
    renderTracker();
  }
}

function deleteExhibit(id) {
  appState.docket = appState.docket.filter((e) => e.id !== id);
  saveTrackerState();
  renderTracker();
}

function openWipeModal() {
  const modal = document.getElementById('wipe-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeWipeModal() {
  const modal = document.getElementById('wipe-modal');
  if (modal) modal.classList.add('hidden');
}

function executeWipe() {
  appState = {
    title: '',
    phase: 'Phase 1: Intake',
    turn: 1,
    ap: 4,
    strikes: 0,
    undos: 3,
    judge: '',
    pros: '',
    client: '',
    notes: '',
    facts: [],
    docket: []
  };
  saveTrackerState();
  closeWipeModal();
  renderTracker();
}

function openSyncModal() {
  const statusEl = document.getElementById('sync-status');
  if (statusEl) statusEl.innerText = '';
  const modal = document.getElementById('sync-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeSyncModal() {
  const modal = document.getElementById('sync-modal');
  if (modal) modal.classList.add('hidden');
}

// ================= PARSER CORE (HUD & /log) =================
function processEngineSync() {
  const inputEl = document.getElementById('sync-input');
  if (!inputEl) return;
  const raw = inputEl.value;
  if (!raw.trim()) return;

  let detected = 0;

  // Turn
  const turnMatch = raw.match(/Turn:\s*(\d+)/i) || raw.match(/الجولة:\s*(\d+)/i);
  if (turnMatch) {
    appState.turn = parseInt(turnMatch[1], 10);
    detected++;
  }

  // Action Points
  const apMatch = raw.match(/AP_Remaining:\s*\[?(\d+)\]?/i) || raw.match(/نقاط_العمل_المتبقية:\s*\[?(\d+)\]?/i);
  if (apMatch) {
    appState.ap = parseInt(apMatch[1], 10);
    detected++;
  }

  // Strikes
  const strikesMatch = raw.match(/Strikes_Current:\s*\[?(\d+)\]?/i) || raw.match(/الإنذارات_الحالية:\s*\[?(\d+)\]?/i);
  if (strikesMatch) {
    appState.strikes = parseInt(strikesMatch[1], 10);
    detected++;
  }

  // Undos
  const undosMatch = raw.match(/Undos_Remaining:\s*\[?(\d+)\]?/i) || raw.match(/التراجعات_المتبقية:\s*\[?(\d+)\]?/i);
  if (undosMatch) {
    appState.undos = parseInt(undosMatch[1], 10);
    detected++;
  }

  // Phase via /log
  const phaseLogMatch = raw.match(/Current_Phase:\s*\[?([^\]\n]+)\]?/i) || raw.match(/المرحلة_الحالية:\s*\[?([^\]\n]+)\]?/i);
  if (phaseLogMatch) {
    normalizeAndSetPhase(phaseLogMatch[1]);
    detected++;
  }

  // Client and Charge
  const clientMatch = raw.match(/Client:\s*\[?([^\]\|\n]+)\]?/i) || raw.match(/الموكل:\s*\[?([^\]\|\n]+)\]?/i);
  if (clientMatch) {
    const chargeMatch = raw.match(/Charge:\s*([^\n]+)/i) || raw.match(/التهمة:\s*([^\n]+)/i);
    const clientName = clientMatch[1].trim();
    appState.client = clientName;
    const vsWord = currentLang === 'ar' ? 'ضد' : 'v.';
    const stateWord = currentLang === 'ar' ? 'الولاية' : 'State';
    appState.title = chargeMatch
      ? `${stateWord} ${vsWord} ${clientName} (${chargeMatch[1].trim()})`
      : `${stateWord} ${vsWord} ${clientName}`;
    detected++;
  }

  // Judge & Prosecutor
  const judgeMatch = raw.match(/Judge\s+([^\n|\]]+)/i) || raw.match(/القاضي\s+([^\n|\]]+)/i);
  if (judgeMatch) appState.judge = judgeMatch[1].trim();

  const prosMatch = raw.match(/Pros:\s*([^\n|\]]+)/i) || raw.match(/المدعي:\s*([^\n|\]]+)/i);
  if (prosMatch) appState.pros = prosMatch[1].trim();

  // 3-Line HUD parsing
  const hudStateMatch = raw.match(/\[(?:STATE|الحالة):\s*([^|]+)\|\s*(?:AP|نقاط العمل):\s*(\d+)(?:\/\d+)?\s*\|\s*(?:Strikes|الإنذارات):\s*(\d+)(?:\/\d+)?\s*\|\s*(?:Undos|التراجعات):\s*([^|]+)/i);
  if (hudStateMatch) {
    normalizeAndSetPhase(hudStateMatch[1].trim());
    appState.ap = parseInt(hudStateMatch[2], 10);
    appState.strikes = parseInt(hudStateMatch[3], 10);
    const rawUndos = hudStateMatch[4].trim().toLowerCase();
    appState.undos = (rawUndos.includes('unlimited') || rawUndos.includes('غير محدود')) ? 99 : (parseInt(rawUndos, 10) || 0);
    detected++;
  }

  const hudRosterMatch = raw.match(/\[(?:ROSTER|التشكيل):\s*(?:Judge|القاضي)\s*([^|]+)\|\s*(?:Pros|المدعي):\s*([^|]+)\|\s*(?:Inv|المحقق):\s*[^|]+\|\s*(?:Client|الموكل):\s*([^\]]+)\]/i);
  if (hudRosterMatch) {
    appState.judge = hudRosterMatch[1].trim();
    appState.pros = hudRosterMatch[2].trim();
    appState.client = hudRosterMatch[3].trim();
    if (!appState.title) {
      const vsWord = currentLang === 'ar' ? 'ضد' : 'v.';
      const stateWord = currentLang === 'ar' ? 'الولاية' : 'State';
      appState.title = `${stateWord} ${vsWord} ${appState.client}`;
    }
    detected++;
  }

  // Docket parsing from HUD
  const docketMatch = raw.match(/\[(?:DOCKET|الأدلة):\s*([^\]]+)\]/i);
  if (docketMatch) {
    docketMatch[1].split('|').forEach((item) => {
      const m = item.trim().match(/(Ex\.\s*\d+|دليل\s*\d+)[-\s]*([^(]+)\(([^)]+)\)/i);
      if (m) {
        const tag = m[1].trim();
        const title = m[2].trim();
        const rawStatus = m[3].trim().toLowerCase();
        let status = 'Admitted';
        if (rawStatus.includes('suppress') || rawStatus.includes('مستبعد')) status = 'Suppressed';
        else if (rawStatus.includes('mark') || rawStatus.includes('pending') || rawStatus.includes('مؤشر')) status = 'Marked';

        const existing = appState.docket.find((e) => e.tag.toLowerCase() === tag.toLowerCase());
        if (existing) {
          existing.title = title;
          existing.status = status;
        } else {
          appState.docket.push({ id: Date.now() + Math.random(), tag, title, details: '', status });
        }
      }
    });
    detected++;
  }

  // Docket parsing from /log
  const logExhibits = raw.matchAll(/-\s*(?:Exhibit|الدليل):\s*\[?([^|\]\n]+)\]?\s*\|\s*(?:Title|العنوان):\s*\[?([^|\]\n]+)\]?\s*\|\s*(?:Status|الحالة):\s*\[?([^\]\n]+)\]?/gi);
  for (const m of logExhibits) {
    const tag = m[1].trim();
    const title = m[2].trim();
    const rawStatus = m[3].trim().toLowerCase();
    let status = 'Admitted';
    if (rawStatus.includes('suppress') || rawStatus.includes('مستبعد')) status = 'Suppressed';
    else if (rawStatus.includes('mark') || rawStatus.includes('pending') || rawStatus.includes('مؤشر')) status = 'Marked';

    const existing = appState.docket.find((e) => e.tag.toLowerCase() === tag.toLowerCase());
    if (existing) {
      existing.title = title;
      existing.status = status;
    } else {
      appState.docket.push({ id: Date.now() + Math.random(), tag, title, details: '', status });
    }
    detected++;
  }

  // Cross Concessions to Facts
  const concessions = raw.matchAll(/(?:Cross_Concessions|اعترافات_المناقشة):\s*\n\s*-\s*([^\n]+)/gi);
  for (const c of concessions) {
    const factPrefix = currentLang === 'ar' ? 'إقرار الشاهد: ' : 'Witness concession: ';
    addFact(`${factPrefix}${c[1].trim()}`);
  }

  const statusEl = document.getElementById('sync-status');
  if (detected > 0) {
    saveTrackerState();
    renderTracker();
    if (statusEl) {
      statusEl.className = 'text-xs font-mono text-emerald-400';
      statusEl.innerText = currentLang === 'ar' ? `تم التحديث بنجاح (${detected} عناصر)` : `Synced (${detected} items updated)`;
    }
    setTimeout(closeSyncModal, 800);
  } else if (statusEl) {
    statusEl.className = 'text-xs font-mono text-rose-400';
    statusEl.innerText = currentLang === 'ar' ? 'تعذر التعرف على بيانات HUD أو /log.' : 'No readable HUD or /log data found.';
  }
}

function normalizeAndSetPhase(phaseStr) {
  const s = phaseStr.toLowerCase();
  if (s.includes('1') || s.includes('intake') || s.includes('استجواب')) appState.phase = 'Phase 1: Intake';
  else if (s.includes('2.5') || s.includes('motion') || s.includes('شكلي')) appState.phase = 'Phase 2.5: Motions';
  else if (s.includes('2') || s.includes('pre-trial') || s.includes('تحقيق')) appState.phase = 'Phase 2: Pre-Trial (Diaz)';
  else if (s.includes('3.5') || s.includes('case-in-chief') || s.includes('مرافعة')) appState.phase = 'Phase 3.5: Case-in-Chief';
  else if (s.includes('3') || s.includes('trial') || s.includes('محاكمة')) appState.phase = 'Phase 3: Trial';
  else if (s.includes('4') || s.includes('verdict') || s.includes('حكم')) appState.phase = 'Phase 4: Verdict';
}

// ================= RENDER WORKSPACE =================
function renderTracker() {
  const dict = typeof translations !== 'undefined' ? translations[currentLang] : {};

  const titleEl = document.getElementById('track-title');
  if (titleEl) titleEl.value = appState.title || '';

  const phaseEl = document.getElementById('track-phase');
  if (phaseEl) phaseEl.value = appState.phase;

  const turnEl = document.getElementById('track-turn');
  if (turnEl) turnEl.innerText = appState.turn;

  const apEl = document.getElementById('track-ap');
  if (apEl) apEl.innerText = appState.ap;

  const strikesEl = document.getElementById('track-strikes');
  if (strikesEl) strikesEl.innerText = appState.strikes;

  const undosEl = document.getElementById('track-undos');
  if (undosEl) undosEl.innerText = appState.undos === 99 ? '∞' : appState.undos;

  const notesEl = document.getElementById('attorney-notes');
  if (notesEl) notesEl.value = appState.notes || '';

  // Roster Banner
  const banner = document.getElementById('roster-banner');
  if (banner) {
    if (appState.judge || appState.pros || appState.client) {
      banner.classList.remove('hidden');
      const judgeEl = document.getElementById('roster-judge');
      const prosEl = document.getElementById('roster-pros');
      const clientEl = document.getElementById('roster-client');
      if (judgeEl) judgeEl.innerText = appState.judge || dict.unassigned || 'Unassigned';
      if (prosEl) prosEl.innerText = appState.pros || dict.unassigned || 'Unassigned';
      if (clientEl) clientEl.innerText = appState.client || dict.pending || 'Pending';
    } else {
      banner.classList.add('hidden');
    }
  }

  // Facts Ledger
  const factContainer = document.getElementById('fact-ledger');
  if (factContainer) {
    factContainer.innerHTML = '';
    if (appState.facts.length === 0) {
      factContainer.innerHTML = `<span class="text-brand-muted italic">${dict.empty_facts || 'No facts logged.'}</span>`;
    } else {
      appState.facts.forEach((f) => {
        factContainer.innerHTML += `
          <div class="pb-1.5 border-b border-brand-border/50 last:border-0 flex justify-between items-start gap-2">
            <span class="pe-2 leading-relaxed">• ${f.text}</span>
            <button onclick="deleteFact(${f.id})" class="px-1 py-0.5 rounded border border-brand-border bg-brand-dark hover:border-rose-700 text-slate-400 hover:text-rose-400 transition text-[10px]" title="${dict.btn_del || 'Delete'}">🗑</button>
          </div>`;
      });
    }
  }

  // Evidence Docket
  const docketContainer = document.getElementById('docket-list');
  if (docketContainer) {
    docketContainer.innerHTML = '';
    if (appState.docket.length === 0) {
      docketContainer.innerHTML = `<div class="p-4 border border-brand-border border-dashed rounded text-brand-muted text-xs font-mono text-center">${dict.empty_docket || 'No evidence logged.'}</div>`;
    } else {
      appState.docket.forEach((item) => {
        const isSuppressed = item.status === 'Suppressed';
        let statusBadgeClass = 'bg-emerald-950 text-emerald-300';
        let statusLabel = dict.btn_admit || 'Admitted';

        if (item.status === 'Marked') {
          statusBadgeClass = 'bg-amber-950 text-amber-300';
          statusLabel = dict.btn_mark || 'Marked';
        } else if (item.status === 'Suppressed') {
          statusBadgeClass = 'bg-rose-950 text-rose-300';
          statusLabel = dict.btn_suppress || 'Suppressed';
        }

        docketContainer.innerHTML += `
          <div class="p-3 rounded border flex flex-col ${isSuppressed ? 'bg-brand-surface/30 border-brand-border/40 opacity-55' : 'bg-brand-surface border-brand-border'} space-y-2 font-mono text-xs">
            <div class="flex justify-between items-start gap-2">
              <span class="font-bold ${isSuppressed ? 'text-brand-muted line-through' : 'text-brand-gold'}">${item.tag}: ${item.title}</span>
              <span class="text-[9px] px-2 py-0.5 rounded font-bold whitespace-nowrap ${statusBadgeClass}">${statusLabel}</span>
            </div>
            ${item.details ? `<p class="text-brand-muted text-[11px] font-sans">${item.details}</p>` : ''}
            <div class="flex justify-between items-center pt-2 border-t border-brand-border/50 mt-1">
              <div class="space-x-1 rtl:space-x-reverse text-[10px]">
                <button onclick="setExhibitStatus(${item.id}, 'Admitted')" class="px-2 py-0.5 rounded bg-brand-dark border border-brand-border hover:text-emerald-400">${dict.btn_admit || 'Admit'}</button>
                <button onclick="setExhibitStatus(${item.id}, 'Marked')" class="px-2 py-0.5 rounded bg-brand-dark border border-brand-border hover:text-amber-400">${dict.btn_mark || 'Mark'}</button>
                <button onclick="setExhibitStatus(${item.id}, 'Suppressed')" class="px-2 py-0.5 rounded bg-brand-dark border border-brand-border hover:text-rose-400">${dict.btn_suppress || 'Suppress'}</button>
              </div>
              <button onclick="deleteExhibit(${item.id})" class="text-brand-muted hover:text-rose-400 text-[10px]">${dict.btn_del || 'Del'}</button>
            </div>
          </div>`;
      });
    }
  }
}

window.onload = initApp;
