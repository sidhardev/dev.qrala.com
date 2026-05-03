// main.js — Entry point: ties scene, pedestals, camera, UI together
import * as THREE from 'three';
import { initScene, scene, camera, renderer, clock, particleMesh } from './scene.js';
import { initPedestals, animatePedestals, updatePedestalHover, checkPedestalClick, pedestalGroups } from './pedestals.js';
import { playEntrance, goTo, getCurrentIndex, applyParallax, setupScroll, setIsAnimating } from './camera.js';
import {
  runLoadingScreen, showHUD, updateLabel, updateNavDots,
  setNavigateFn, initNavControls, initModalControls,
  openModal, isModalOpen,
} from './ui.js';

// ── Init ──────────────────────────────────────────────────────
const canvas = document.getElementById('three-canvas');
initScene(canvas);
initPedestals();

// ── Navigate function (shared across scroll, arrows, dots, keys) ──
function navigate(idx) {
  if (isModalOpen()) return;
  if (idx < 0 || idx > 2) return;
  goTo(idx, () => {});
  updateLabel(idx);
  updateNavDots(idx);
}

setNavigateFn(navigate);
setupScroll(navigate);

// ── Click detection ───────────────────────────────────────────
canvas.addEventListener('click', () => {
  if (isModalOpen()) return;
  const hit = checkPedestalClick(camera);
  if (hit >= 0) {
    // If already at this pedestal, open modal; else navigate first
    if (hit === getCurrentIndex()) {
      openModal(hit);
    } else {
      navigate(hit);
      setTimeout(() => openModal(hit), 1500);
    }
  }
});

// ── Loading → Entrance ────────────────────────────────────────
runLoadingScreen(() => {
  showHUD();
  initNavControls();
  initModalControls();
  updateLabel(0);
  updateNavDots(0);

  playEntrance(() => {
    // After entrance animation, start parallax
  });
});

// ── Billboard labels to always face camera ────────────────────
const _vec = new THREE.Vector3();
function billboardLabels() {
  pedestalGroups.forEach(g => {
    g.children.forEach(c => {
      if (c.userData.isLabel) {
        c.quaternion.copy(camera.quaternion);
      }
    });
  });
}

// ── Animation Loop ────────────────────────────────────────────
const clock2 = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const t = clock2.getElapsedTime();

  // Animate icons + pedestals
  animatePedestals(t);

  // Rotate particles slowly
  if (particleMesh) {
    particleMesh.rotation.y = t * 0.018;
    particleMesh.rotation.x = Math.sin(t * 0.008) * 0.06;
  }

  // Mouse parallax (only when modal is closed and no anim in progress)
  if (!isModalOpen()) {
    applyParallax();
  }

  // Billboard labels
  billboardLabels();

  // Hover glow
  updatePedestalHover(camera);

  renderer.render(scene, camera);
}

animate();
