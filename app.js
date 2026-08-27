/**
 * Ahmad Aziz — Portfolio High-Craft Interactive System & Project Simulators
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initProjectFiltering();
  initSkillsFiltering();
  initKeyboardShortcuts();
  initTelemetryLiveTicker();
  initFooterMeta();
});

function initFooterMeta() {
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  const statusEl = document.getElementById('availability-status');
  if (statusEl) {
    const now = new Date();
    const month = now.getMonth();
    const statusText = month >= 8 && month <= 11
      ? 'Available for AI engineering collaborations and prototype builds.'
      : 'Booking select AI engineering collaborations for the next cycle.';
    statusEl.textContent = statusText;
  }
}

/* ==========================================================================
   1. Navbar Scroll & Active Link Spy
   ========================================================================== */
function initNavbarScroll() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. Project Category Filtering
   ========================================================================== */
function initProjectFiltering() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.studio-project-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   3. Skills Filtering
   ========================================================================== */
function initSkillsFiltering() {
  const skillBtns = document.querySelectorAll('.skill-selector-btn');
  const skillCards = document.querySelectorAll('.studio-skill-card');

  skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-skill-tab');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Modal Controller
   ========================================================================== */
function openDemoModal(modalId) {
  const modal = document.getElementById(`modal-${modalId}`);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeDemoModal(modalId) {
  const modal = document.getElementById(`modal-${modalId}`);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleBackdropClick(event, modalId) {
  if (event.target.classList.contains('modal-backdrop')) {
    closeDemoModal(modalId);
  }
}

function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });
}

/* ==========================================================================
   5. Enhanced Live Telemetry & State Machine Engine
   ========================================================================== */
function switchTelemetryTab(tabName, btn) {
  document.querySelectorAll('.telem-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.telemetry-view-pane').forEach(p => p.classList.remove('active'));

  if (btn) btn.classList.add('active');
  const targetPane = document.getElementById(`pane-${tabName}`);
  if (targetPane) {
    targetPane.classList.add('active');
  }
}

let pipelineIteration = 1;
function runLiveAgentPipeline() {
  const terminal = document.getElementById('telem-terminal-output');
  const signalsCountEl = document.getElementById('telem-signals-count');
  const velocityEl = document.getElementById('telem-velocity-val');

  const randomLocations = ['Nowshera Zone A', 'Charsadda Riverbank', 'Swat Valley Sector 3', 'Kabul River Basin'];
  const loc = randomLocations[Math.floor(Math.random() * randomLocations.length)];
  const lat = (34.015 + (Math.random() * 0.05)).toFixed(4);
  const lng = (71.974 + (Math.random() * 0.05)).toFixed(4);
  const executionMs = (38 + Math.random() * 8).toFixed(1);

  const newLogBlock = document.createElement('div');
  newLogBlock.style.marginTop = '12px';
  newLogBlock.style.borderTop = '1px solid rgba(255,255,255,0.08)';
  newLogBlock.style.paddingTop = '8px';

  newLogBlock.innerHTML = `
    <div class="telem-log-line gold">[DISPATCH #${pipelineIteration++}] INBOUND TRIGGER → Lat: ${lat}°N, Lng: ${lng}°E (${loc})</div>
    <div class="telem-log-line green">⚡ [AGENT 1: INTAKE] Tokenizer: Dialect UR/PS | FastText Score: 0.996</div>
    <div class="telem-log-line cyan">🔍 [AGENT 2: TRIAGE] Hazard: FLASH_FLOOD_STRANDED | Severity: 9.6/10</div>
    <div class="telem-log-line gold">📍 [AGENT 3: REDIS GEO] Matched Rescue Boat Cluster ID: RESCUE-1122-DELTA</div>
    <div class="telem-log-line green">🚀 [AGENT 4: DISPATCH] Route confirmed. ETA: ${(3.2 + Math.random() * 1.5).toFixed(1)} mins. Velocity: ${executionMs}ms</div>
  `;

  terminal.appendChild(newLogBlock);
  terminal.scrollTop = terminal.scrollHeight;

  if (signalsCountEl) {
    const current = parseInt(signalsCountEl.textContent.replace(',', '')) || 12842;
    signalsCountEl.textContent = (current + 1).toLocaleString();
  }
  if (velocityEl) {
    velocityEl.textContent = `0.0${Math.floor(executionMs)}s`;
  }

  showToast(`Agent Run #${pipelineIteration - 1} Executed in ${executionMs}ms`);
}

function setNlpExample(text) {
  const input = document.getElementById('nlp-test-input');
  if (input) {
    input.value = text;
    tokenizeLiveInput();
  }
}

function tokenizeLiveInput() {
  const input = document.getElementById('nlp-test-input');
  const output = document.getElementById('nlp-terminal-output');
  if (!input || !output) return;

  const text = input.value.trim();
  if (!text) return;

  let script = 'English (Latin)';
  let intent = 'GENERAL_INQUIRY';
  let severity = 'MODERATE';
  let hazard = 'Weather Event';
  let tokens = [];

  if (/[\u0600-\u06FF]/.test(text)) {
    if (text.includes('د') || text.includes('پاتې') || text.includes('ننوتي') || text.includes('او')) {
      script = 'Pashto (Eastern Iranian)';
      intent = 'EMERGENCY_ROOFTOP_STRANDED';
      severity = 'CRITICAL';
      hazard = 'FlashFlood Entrapment';
      tokens = text.split(/\s+/).slice(0, 6);
    } else {
      script = 'Urdu (Perso-Arabic)';
      intent = 'EMERGENCY_RESCUE_DISPATCH';
      severity = 'CRITICAL_HIGH';
      hazard = 'Water Ingress & Stranded Victims';
      tokens = text.split(/\s+/).slice(0, 6);
    }
  } else {
    tokens = text.split(/\s+/).slice(0, 6);
    if (text.toLowerCase().includes('flood') || text.toLowerCase().includes('emergency') || text.toLowerCase().includes('rescue')) {
      intent = 'EMERGENCY_RESCUE_DISPATCH';
      severity = 'HIGH';
      hazard = 'Infrastructure Washout';
    }
  }

  const tokenString = JSON.stringify(tokens);

  output.innerHTML = `
    <div class="telem-log-line gold">[TOKENIZER RESULTS FOR: "${text}"]:</div>
    <div class="telem-log-line cyan">• Detected Language: ${script} | Tokenizer Confidence: 99.7%</div>
    <div class="telem-log-line green">• Subword Tokens: ${tokenString}</div>
    <div class="telem-log-line gold">• Intent Classification: ${intent} (Confidence: 0.993)</div>
    <div class="telem-log-line green">• Extracted Entities: { HAZARD: '${hazard}', SEVERITY: '${severity}', TIMESTAMP: '${new Date().toLocaleTimeString()}' }</div>
    <div class="telem-log-line dim">• Transformer Inference: ${(12 + Math.random() * 5).toFixed(1)}ms | Zero Cache Misses</div>
  `;

  showToast('NLP Tokenization Complete');
}

function simulateClusterLoad() {
  const terminal = document.getElementById('cluster-terminal-output');
  const podCountEl = document.getElementById('k8s-pod-count');
  const wsCountEl = document.getElementById('k8s-ws-count');
  const cpuValEl = document.getElementById('k8s-cpu-val');

  if (terminal) {
    terminal.innerHTML += `
      <div class="telem-log-line gold" style="margin-top: 8px;">⚡ [LOAD STIMULUS]: Injecting 15,000 concurrent WebSocket connections...</div>
      <div class="telem-log-line cyan">• [KUBERNETES HPA]: Horizontal Pod Autoscaler triggered (+6 pods provisioned).</div>
      <div class="telem-log-line green">• [REDIS CLUSTER]: Ingress 48.2k ops/s | P99 Latency: 9.4ms | 0 packet loss.</div>
      <div class="telem-log-line green">✓ [STATUS]: Ingress stabilized across 18 pods. System nominal.</div>
    `;
    terminal.scrollTop = terminal.scrollHeight;
  }

  if (podCountEl) podCountEl.textContent = '18 Pods Running (Autoscaled)';
  if (wsCountEl) wsCountEl.textContent = '4,280 Active';
  if (cpuValEl) cpuValEl.textContent = '42.8%';

  showToast('Cluster Stress Test Passed (100% SLA)');
}

function initTelemetryLiveTicker() {
  const latencyEl = document.getElementById('telem-latency-val');
  setInterval(() => {
    if (latencyEl) {
      const ms = Math.floor(11 + Math.random() * 4);
      latencyEl.textContent = `${ms}ms`;
    }
  }, 2200);
}

/* ==========================================================================
   6. FloodCommand 5-Agent Live Simulation Engine
   ========================================================================== */
let isFloodSimRunning = false;

function runFloodSim(type) {
  if (isFloodSimRunning) return;
  isFloodSimRunning = true;

  const feed = document.getElementById('flood-feed');
  feed.innerHTML = '';

  const steps = [
    { text: `[WEBHOOK] Inbound WhatsApp message received via Twilio endpoint.`, delay: 200, color: '#e6c387' },
    { text: `[AGENT 1: INTAKE] Detecting dialect & tokenizing raw text...`, delay: 600, color: '#cbd5e0' },
    { text: `[AGENT 1] Dialect: ${type.toUpperCase()} | Confidence: 99.4%`, delay: 1100, color: '#68d391' },
    { text: `[AGENT 2: TRIAGE] Distress: Flood water ingress, rooftop entrapment.`, delay: 1600, color: '#cbd5e0' },
    { text: `[AGENT 2] Severity Score: 9.4/10 [CRITICAL_IMMEDIATE]`, delay: 2100, color: '#4fd1c5' },
    { text: `[AGENT 3: GEOSPATIAL] Resolving coordinates & querying Redis spatial index...`, delay: 2600, color: '#cbd5e0' },
    { text: `[AGENT 3] Location: 34.0151° N, 71.9747° E (Nowshera Zone B). Proximity cluster identified.`, delay: 3100, color: '#68d391' },
    { text: `[AGENT 4: DISPATCH] Locating nearest rescue unit with motorized inflatable boat.`, delay: 3600, color: '#cbd5e0' },
    { text: `[AGENT 4] Assigned: Rescue Unit 1122 - Alpha 4 (ETA: 4.2 mins). Automated dispatch sent.`, delay: 4100, color: '#4fd1c5' },
    { text: `[AGENT 5: AUDIT] Mission logged to persistent ledger. Dispatch completed in 1.4 seconds.`, delay: 4600, color: '#68d391' }
  ];

  let currentStep = 0;
  function executeStep() {
    if (currentStep < steps.length) {
      const step = steps[currentStep];
      setTimeout(() => {
        const line = document.createElement('div');
        line.style.marginBottom = '6px';
        line.style.color = step.color;
        line.textContent = step.text;
        feed.appendChild(line);
        feed.scrollTop = feed.scrollHeight;
        currentStep++;
        executeStep();
      }, step.delay - (currentStep > 0 ? steps[currentStep - 1].delay : 0));
    } else {
      isFloodSimRunning = false;
    }
  }

  executeStep();
}

/* ==========================================================================
   7. MediGuide Symptom Triage Chatbot Simulator
   ========================================================================== */
let currentChatLang = 'en';

function setChatLang(lang) {
  currentChatLang = lang;
  const messages = document.getElementById('mediguide-messages');
  const greeting = lang === 'ur' 
    ? 'خوش آمدید! میں میڈی گائیڈ ہوں۔ براہ کرم اپنی علامات یا طبی سوال بیان کریں تاکہ میں فوری رہنمائی فراہم کر سکوں۔'
    : 'Hello! I am MediGuide. Please describe your symptoms or what health guidance you need today (English or Urdu).';
  
  messages.innerHTML = `<div style="background: rgba(255,255,255,0.06); padding: 10px 14px; border-radius: 12px; font-size: 0.85rem; max-width: 80%; align-self: flex-start;">${greeting}</div>`;
  showToast(lang === 'ur' ? 'زبان اردو میں تبدیل ہو گئی' : 'Language set to English');
}

function fillMediPrompt(text) {
  const input = document.getElementById('mediguide-input');
  input.value = text;
  sendMediGuideMessage();
}

function sendMediGuideMessage() {
  const input = document.getElementById('mediguide-input');
  const messages = document.getElementById('mediguide-messages');
  const query = input.value.trim();
  if (!query) return;

  // Append user message
  const userBubble = document.createElement('div');
  userBubble.style.background = 'linear-gradient(135deg, #e6c387, #b08d46)';
  userBubble.style.color = '#07080b';
  userBubble.style.fontWeight = '600';
  userBubble.style.padding = '10px 14px';
  userBubble.style.borderRadius = '12px';
  userBubble.style.fontSize = '0.85rem';
  userBubble.style.maxWidth = '80%';
  userBubble.style.alignSelf = 'flex-end';
  userBubble.textContent = query;
  messages.appendChild(userBubble);
  input.value = '';
  messages.scrollTop = messages.scrollHeight;

  // Simulate AI Thinking
  setTimeout(() => {
    const botBubble = document.createElement('div');
    botBubble.style.background = 'rgba(255,255,255,0.06)';
    botBubble.style.padding = '10px 14px';
    botBubble.style.borderRadius = '12px';
    botBubble.style.fontSize = '0.85rem';
    botBubble.style.maxWidth = '80%';
    botBubble.style.alignSelf = 'flex-start';

    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('chest pain') || lowerQuery.includes('heart') || lowerQuery.includes('arm')) {
      botBubble.innerHTML = `⚠️ <strong style="color: #ff5f56;">URGENT RED-FLAG ALERT:</strong> Symptoms suggestive of possible acute coronary event. Please call emergency services (1122) immediately or visit the nearest emergency department.`;
    } else if (lowerQuery.includes('fever') || lowerQuery.includes('shivering') || lowerQuery.includes('headache')) {
      botBubble.innerHTML = `🩺 <strong>Clinical Triage:</strong> High fever with shivering suggests an active infection.<br>• Maintain hydration.<br>• Monitor body temperature.<br>• Consult a physician if fever persists &gt; 48 hours.`;
    } else if (query.includes('سانس') || query.includes('کھانسی') || query.includes('دشواری')) {
      botBubble.innerHTML = `🩺 <strong>طبی جائزہ:</strong> کھانسی اور سانس لینے میں دشواری پھیپھڑوں کے انفیکشن کی علامت ہو سکتی ہے۔ اگر ہونٹ نیلے ہو رہے ہوں یا شدید گھبراہٹ ہو تو فوری قریبی ایمرجنسی رجوع کریں۔`;
    } else {
      botBubble.innerHTML = `🩺 <strong>Triage Note:</strong> Ensure adequate rest and fluid intake. If symptoms worsen or severe distress occurs, please consult a licensed medical physician.`;
    }

    messages.appendChild(botBubble);
    messages.scrollTop = messages.scrollHeight;
  }, 450);
}

/* ==========================================================================
   8. AudiWave Audio-to-Sign-Language Visualizer
   ========================================================================== */
let isAudioSimActive = false;
let audioSimInterval = null;

const aslGlossPhrases = [
  '[INPUT]: "Welcome to the cloud computing conference"',
  '[ASL GLOSS]: WELCOME CLOUD COMPUTE CONFERENCE MEET',
  '[INPUT]: "Emergency evacuation notice for all residents"',
  '[ASL GLOSS]: DANGER EMERGENCY EVACUATE PEOPLE ALL MUST',
  '[INPUT]: "Artificial Intelligence transforms modern systems"',
  '[ASL GLOSS]: AI TECHNOLOGY ADVANCE POWERFUL'
];

function toggleAudioWaveSim() {
  const btn = document.getElementById('audiwave-toggle-btn');
  const output = document.getElementById('asl-output');
  const bars = document.querySelectorAll('#wave-bars-box .audio-bar');

  if (isAudioSimActive) {
    isAudioSimActive = false;
    clearInterval(audioSimInterval);
    bars.forEach(bar => bar.classList.remove('active'));
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg> Start Audio Stream Simulation`;
    output.textContent = '[ASL GLOSS STREAM]: STREAM PAUSED';
  } else {
    isAudioSimActive = true;
    bars.forEach(bar => bar.classList.add('active'));
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="14" height="14" x="5" y="5" rx="2"/></svg> Pause Audio Stream`;

    let phraseIdx = 0;
    output.textContent = aslGlossPhrases[phraseIdx];

    audioSimInterval = setInterval(() => {
      phraseIdx = (phraseIdx + 1) % aslGlossPhrases.length;
      output.textContent = aslGlossPhrases[phraseIdx];
    }, 2000);
  }
}

/* ==========================================================================
   9. Cluster & Telemetry Simulation Testers
   ========================================================================== */
function runClusterStressTest() {
  const feed = document.getElementById('cluster-feed');
  feed.innerHTML = `
    • [INGRESS STRESS TEST] Simulating 10,000 req/sec load...<br>
    • [KUBERNETES AUTOSCALER] Scaled from 6 to 18 Pods (Zero dropped packets)<br>
    • [REDIS BENCHMARK] Mean latency: 8.4ms | Throughput: 42,000 ops/sec<br>
    • <strong style="color: #68d391;">STATUS: CLUSTER OPTIMAL (100% HEALTH SCORE)</strong>
  `;
  showToast('Cluster Benchmark Complete');
}

function runOrionScan() {
  const feed = document.getElementById('orion-telemetry-feed');
  feed.innerHTML = `
    ⚠️ [ANOMALY DETECTED]: Drill Bit 4B Thermal Spike (+32°C over baseline)<br>
    🔍 [RAG QUERY]: Searching Rig Maintenance Manual (Section 8.4 - Thermal Thresholds)...<br>
    🤖 [RAG DIAGNOSIS]: Recommend cooling pump flow rate increase by 15% and 200 RPM reduction to prevent seal failure.<br>
    • <strong style="color: #4fd1c5;">ACTION DISPATCHED TO RIG TELEMETRY BUS</strong>
  `;
  showToast('Orion RAG Diagnosis Generated');
}

/* ==========================================================================
   10. Clipboard Copy & Toast Feedback
   ========================================================================== */
function copyToClipboard(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg || 'Copied to clipboard!');
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showToast(successMsg || 'Copied to clipboard!');
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast-bubble';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e6c387" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2800);
}

/* ==========================================================================
   11. Contact Form Transmission Handler
   ========================================================================== */
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const message = document.getElementById('contact-message').value;

  showToast(`Thank you, ${name}! Opening mail client...`);

  setTimeout(() => {
    const mailtoUri = `mailto:ahmadazizalt@gmail.com?subject=${encodeURIComponent(`Portfolio Inquiry from ${name}`)}&body=${encodeURIComponent(`Sender: ${name} (${email})\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoUri;
    document.getElementById('portfolio-contact-form').reset();
  }, 800);
}

// Attach all functions to window for 100% inline accessibility
window.openDemoModal = openDemoModal;
window.closeDemoModal = closeDemoModal;
window.handleBackdropClick = handleBackdropClick;
window.switchTelemetryTab = switchTelemetryTab;
window.runLiveAgentPipeline = runLiveAgentPipeline;
window.setNlpExample = setNlpExample;
window.tokenizeLiveInput = tokenizeLiveInput;
window.simulateClusterLoad = simulateClusterLoad;
window.runFloodSim = runFloodSim;
window.setChatLang = setChatLang;
window.fillMediPrompt = fillMediPrompt;
window.sendMediGuideMessage = sendMediGuideMessage;
window.toggleAudioWaveSim = toggleAudioWaveSim;
window.runClusterStressTest = runClusterStressTest;
window.runOrionScan = runOrionScan;
window.copyToClipboard = copyToClipboard;
window.handleContactSubmit = handleContactSubmit;
