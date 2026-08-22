/**
 * Ahmad Aziz — Portfolio High-Craft Interactive System
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initProjectFiltering();
  initSkillsFiltering();
  initKeyboardShortcuts();
});

/* ==========================================================================
   1. Navbar Scroll & Active Link Spy
   ========================================================================== */
function initNavbarScroll() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item-link');

  window.addEventListener('scroll', () => {
    // Header shadow & background blur on scroll
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Spy
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
   2. Project Filtering
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
          card.style.transform = 'translateY(0)';
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
   4. Interactive Modals Controller
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
   5. FloodCommand 5-Agent Live Simulation Engine
   ========================================================================== */
let isFloodSimRunning = false;

function runFloodSim(type) {
  if (isFloodSimRunning) return;
  isFloodSimRunning = true;

  const feed = document.getElementById('flood-feed');
  feed.innerHTML = '';

  const steps = [
    { text: `[WEBHOOK] Inbound WhatsApp message received via Twilio endpoint.`, delay: 200, color: '#e6c387' },
    { text: `[AGENT 1: INTAKE] Detecting dialect & tokenizing raw text...`, delay: 700, color: '#cbd5e0' },
    { text: `[AGENT 1] Dialect: ${type.toUpperCase()} | Confidence: 99.4%`, delay: 1200, color: '#68d391' },
    { text: `[AGENT 2: TRIAGE] Extracting distress parameters: Flood water ingress, rooftop entrapment.`, delay: 1800, color: '#cbd5e0' },
    { text: `[AGENT 2] Severity Score: 9.4/10 [CRITICAL_IMMEDIATE]`, delay: 2400, color: '#4fd1c5' },
    { text: `[AGENT 3: GEOSPATIAL] Resolving coordinates & querying Redis spatial index...`, delay: 3000, color: '#cbd5e0' },
    { text: `[AGENT 3] Location: 34.0151° N, 71.9747° E (Nowshera Zone B). Proximity cluster identified.`, delay: 3600, color: '#68d391' },
    { text: `[AGENT 4: DISPATCH] Locating nearest rescue unit with motorized inflatable boat.`, delay: 4200, color: '#cbd5e0' },
    { text: `[AGENT 4] Assigned: Rescue Unit 1122 - Alpha 4 (ETA: 4.2 mins). Automated dispatch sent.`, delay: 4800, color: '#4fd1c5' },
    { text: `[AGENT 5: AUDIT] Mission logged to persistent ledger. Dispatch completed in 1.4 seconds.`, delay: 5400, color: '#68d391' }
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
   6. MediGuide Symptom Triage Chatbot Simulator
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
  userBubble.style.fontWeight = '500';
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
  }, 500);
}

/* ==========================================================================
   7. AudiWave Audio-to-Sign-Language Visualizer
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

  if (isAudioSimActive) {
    isAudioSimActive = false;
    clearInterval(audioSimInterval);
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg> Start Audio Stream Simulation`;
    output.textContent = '[ASL GLOSS STREAM]: STREAM PAUSED';
  } else {
    isAudioSimActive = true;
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="14" height="14" x="5" y="5" rx="2"/></svg> Pause Audio Stream`;

    let phraseIdx = 0;
    output.textContent = aslGlossPhrases[phraseIdx];

    audioSimInterval = setInterval(() => {
      phraseIdx = (phraseIdx + 1) % aslGlossPhrases.length;
      output.textContent = aslGlossPhrases[phraseIdx];
    }, 2200);
  }
}

/* ==========================================================================
   8. Clipboard Copy & Toast Feedback
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
   9. Contact Form Transmission Handler
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
