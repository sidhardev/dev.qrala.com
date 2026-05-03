// camera.js — GSAP-driven camera navigation between pedestals
import { camera } from './scene.js';
import { PROJECTS } from './pedestals.js';

// Camera positions aligned with each pedestal
const WAYPOINTS = [
  { pos: { x: -5.5, y: 3.2, z:  2.5 }, target: { x: -5.5, y: 1.6, z: -4 } },  // VisionSecure
  { pos: { x:  0,   y: 3.4, z: -4.2 }, target: { x:  0,   y: 1.6, z:-10 } },  // SG Automobiles
  { pos: { x:  5.5, y: 3.2, z:  2.5 }, target: { x:  5.5, y: 1.6, z: -4 } },  // LMS
];

// Entrance position (before any pedestal is selected)
const ENTRANCE = { pos: { x: 0, y: 4.5, z: 14 }, target: { x: 0, y: 1, z: 0 } };

let currentIdx = 0;
let isAnimating = false;

export function getCurrentIndex() { return currentIdx; }
export function setIsAnimating(v) { isAnimating = v; }

// ── Fly-in entrance animation ─────────────────────────────────
export function playEntrance(onComplete) {
  const start = { px: 0, py: 12, pz: 25, tx: 0, ty: 1, tz: 0 };
  camera.position.set(start.px, start.py, start.pz);

  const target = WAYPOINTS[0];
  gsap.to(start, {
    px: target.pos.x, py: target.pos.y, pz: target.pos.z,
    tx: target.target.x, ty: target.target.y, tz: target.target.z,
    duration: 2.4,
    ease: 'power3.inOut',
    onUpdate: () => {
      camera.position.set(start.px, start.py, start.pz);
      camera.lookAt(start.tx, start.ty, start.tz);
    },
    onComplete: () => { isAnimating = false; onComplete && onComplete(); },
  });
}

// ── Navigate to a pedestal by index ──────────────────────────
export function goTo(idx, onComplete) {
  if (isAnimating) return;
  if (idx < 0) idx = 0;
  if (idx > 2) idx = 2;
  isAnimating = true;
  currentIdx = idx;

  const wp = WAYPOINTS[idx];
  const from = {
    px: camera.position.x, py: camera.position.y, pz: camera.position.z,
  };
  // Compute current lookAt target via a temp Vector3
  const obj = { ...from, tx: 0, ty: 1.6, tz: 0 };

  gsap.to(obj, {
    px: wp.pos.x, py: wp.pos.y, pz: wp.pos.z,
    tx: wp.target.x, ty: wp.target.y, tz: wp.target.z,
    duration: 1.4,
    ease: 'power3.inOut',
    onUpdate: () => {
      camera.position.set(obj.px, obj.py, obj.pz);
      camera.lookAt(obj.tx, obj.ty, obj.tz);
    },
    onComplete: () => {
      isAnimating = false;
      onComplete && onComplete();
    },
  });
}

// ── Zoom INTO pedestal for modal reveal ──────────────────────
export function zoomIn(idx, onComplete) {
  if (isAnimating) return;
  isAnimating = true;

  const proj = PROJECTS[idx];
  const close = {
    px: proj.pos.x * 0.7, py: 2.4, pz: proj.pos.z + 3.5,
    tx: proj.pos.x, ty: 1.8, tz: proj.pos.z,
  };
  const obj = {
    px: camera.position.x, py: camera.position.y, pz: camera.position.z,
    tx: proj.pos.x, ty: 1.6, tz: proj.pos.z,
  };

  gsap.to(obj, {
    px: close.px, py: close.py, pz: close.pz,
    tx: close.tx, ty: close.ty, tz: close.tz,
    duration: 0.9,
    ease: 'power2.inOut',
    onUpdate: () => {
      camera.position.set(obj.px, obj.py, obj.pz);
      camera.lookAt(obj.tx, obj.ty, obj.tz);
    },
    onComplete: () => { isAnimating = false; onComplete && onComplete(); },
  });
}

// ── Zoom BACK out to waypoint ─────────────────────────────────
export function zoomOut(idx, onComplete) {
  goTo(idx, onComplete);
}

// ── Subtle mouse parallax offset ─────────────────────────────
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / innerWidth  - 0.5) * 2;
  mouseY = (e.clientY / innerHeight - 0.5) * 2;
});

export function applyParallax() {
  const wp = WAYPOINTS[currentIdx];
  const targetX = wp.pos.x + mouseX * 0.35;
  const targetY = wp.pos.y - mouseY * 0.2;
  camera.position.x += (targetX - camera.position.x) * 0.04;
  camera.position.y += (targetY - camera.position.y) * 0.04;
  camera.lookAt(wp.target.x, wp.target.y, wp.target.z);
}

// ── Scroll wheel navigation ───────────────────────────────────
export function setupScroll(navigateFn) {
  let lastScroll = 0;
  window.addEventListener('wheel', (e) => {
    const now = Date.now();
    if (now - lastScroll < 900) return; // debounce
    lastScroll = now;
    if (e.deltaY > 0) navigateFn(currentIdx + 1);
    else              navigateFn(currentIdx - 1);
  });
}
