// ui.js — Loading screen, modal, nav dots, keyboard input
import { PROJECTS } from './pedestals.js';
import { goTo, zoomIn, zoomOut, getCurrentIndex } from './camera.js';

// ── Loading Screen ────────────────────────────────────────────
const TERMINAL_LINES = [
  'Initialising Showroom...',
  'Loading WebGL Engine...',
  'Building 3D Environment...',
  'Calibrating Neon Lights...',
  'Placing Project Pedestals...',
  'Welcome, Dev Sidhar ✓',
];

export function runLoadingScreen(onComplete) {
  const output   = document.getElementById('terminal-output');
  const bar      = document.getElementById('progress-bar');
  const pText    = document.getElementById('progress-text');
  const screen   = document.getElementById('loading-screen');

  let lineIdx = 0;

  function printLine() {
    if (lineIdx >= TERMINAL_LINES.length) {
      // Final 100%
      bar.style.width = '100%';
      pText.textContent = '100%';
      setTimeout(() => {
        screen.classList.add('fade-out');
        setTimeout(onComplete, 850);
      }, 600);
      return;
    }

    const span = document.createElement('span');
    span.className = 't-line';
    span.innerHTML = `<span class="prompt">></span> ${TERMINAL_LINES[lineIdx]}`;
    output.appendChild(span);
    requestAnimationFrame(() => span.classList.add('show'));

    const pct = Math.round(((lineIdx + 1) / TERMINAL_LINES.length) * 100);
    bar.style.width = pct + '%';
    pText.textContent = pct + '%';

    lineIdx++;
    setTimeout(printLine, 380 + Math.random() * 220);
  }

  setTimeout(printLine, 700);
}

// ── HUD show/hide ─────────────────────────────────────────────
export function showHUD() {
  const hud = document.getElementById('hud');
  hud.classList.remove('hidden');
}

// ── Update project label ──────────────────────────────────────
export function updateLabel(idx) {
  const proj = PROJECTS[idx];
  document.getElementById('project-label-name').textContent = proj.name;
  document.getElementById('project-label-sub').textContent  = proj.subtitle;

  // Tint the label color
  document.getElementById('project-label-name').style.color = proj.colorHex;
}

// ── Nav dots ──────────────────────────────────────────────────
export function updateNavDots(idx) {
  document.querySelectorAll('.nav-dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}

// ── Navigate helper (used by nav dots, arrows, keyboard, scroll) ──
let navigateFn = null;
export function setNavigateFn(fn) { navigateFn = fn; }

export function initNavControls() {
  // Nav dots
  document.querySelectorAll('.nav-dot').forEach(dot => {
    dot.addEventListener('click', () => navigateFn(+dot.dataset.idx));
  });

  // Arrow buttons
  document.getElementById('btn-prev').addEventListener('click', () => navigateFn(getCurrentIndex() - 1));
  document.getElementById('btn-next').addEventListener('click', () => navigateFn(getCurrentIndex() + 1));

  // View Project button
  document.getElementById('btn-view-project').addEventListener('click', () => {
    openModal(getCurrentIndex());
  });

  // Keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    navigateFn(getCurrentIndex() - 1);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  navigateFn(getCurrentIndex() + 1);
    if (e.key === 'Enter' || e.key === ' ')  openModal(getCurrentIndex());
    if (e.key === 'Escape') closeModal();
  });
}

// ── Modal ─────────────────────────────────────────────────────
let modalOpen = false;
export function isModalOpen() { return modalOpen; }

export function openModal(idx) {
  const proj = PROJECTS[idx];
  modalOpen = true;

  // Zoom camera in
  zoomIn(idx);

  // Populate modal
  document.getElementById('modal-title').textContent    = proj.name;
  document.getElementById('modal-subtitle').textContent = proj.subtitle;
  document.getElementById('modal-description').textContent = proj.description;
  document.getElementById('modal-live-link').href = proj.link;

  // Tech badges
  const stack = document.getElementById('modal-tech-stack');
  stack.innerHTML = '';
  proj.tech.forEach(t => {
    const badge = document.createElement('span');
    badge.className = 'tech-badge';
    badge.textContent = t;
    badge.style.color = proj.colorHex;
    badge.style.borderColor = proj.colorHex + '55';
    badge.style.background = proj.colorHex + '11';
    stack.appendChild(badge);
  });

  // Modal accent line (border-top color)
  document.getElementById('modal-content').style.borderTopColor = proj.colorHex;
  document.getElementById('modal-live-link').style.color = proj.colorHex;
  document.getElementById('modal-live-link').style.borderColor = proj.colorHex;

  // Draw mini icon in canvas
  drawModalIcon(proj);

  // Show modal
  document.getElementById('project-modal').classList.remove('hidden');
}

export function closeModal() {
  if (!modalOpen) return;
  modalOpen = false;
  document.getElementById('project-modal').classList.add('hidden');
  zoomOut(getCurrentIndex());
}

export function initModalControls() {
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('modal-backdrop').addEventListener('click', closeModal);
}

// ── Mini icon drawn on canvas (modal header) ──────────────────
function drawModalIcon(proj) {
  const canvas = document.getElementById('modal-icon-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 80, 80);

  const col = proj.colorHex;
  ctx.strokeStyle = col;
  ctx.fillStyle = col + '33';
  ctx.lineWidth = 2;
  ctx.shadowColor = col;
  ctx.shadowBlur = 12;

  if (proj.icon === 'lens') {
    // Outer ring
    ctx.beginPath(); ctx.arc(40, 40, 28, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(40, 40, 16, 0, Math.PI * 2);
    ctx.fillStyle = col + '55'; ctx.fill(); ctx.stroke();
    // Centre dot
    ctx.beginPath(); ctx.arc(40, 40, 5, 0, Math.PI * 2);
    ctx.fillStyle = col; ctx.fill();

  } else if (proj.icon === 'car') {
    // Body
    ctx.fillRect(14, 34, 52, 16);
    ctx.strokeRect(14, 34, 52, 16);
    // Roof
    ctx.fillStyle = col + '55';
    ctx.beginPath();
    ctx.roundRect(22, 22, 32, 14, 4);
    ctx.fill(); ctx.stroke();
    // Wheels
    ctx.fillStyle = col + '33';
    [[22, 50], [58, 50]].forEach(([cx, cy]) => {
      ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    });

  } else if (proj.icon === 'coin') {
    // Coin
    ctx.beginPath(); ctx.ellipse(40, 40, 30, 12, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    // Star
    ctx.fillStyle = col;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a1 = (Math.PI * 2 / 5) * i - Math.PI / 2;
      const a2 = a1 + Math.PI / 5;
      if (i === 0) ctx.moveTo(40 + 12 * Math.cos(a1), 40 + 12 * Math.sin(a1));
      else         ctx.lineTo(40 + 12 * Math.cos(a1), 40 + 12 * Math.sin(a1));
      ctx.lineTo(40 + 6 * Math.cos(a2), 40 + 6 * Math.sin(a2));
    }
    ctx.closePath(); ctx.fill();
  }
}
