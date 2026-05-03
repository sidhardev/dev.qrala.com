// scene.js — Three.js environment setup
import * as THREE from 'three';

export let scene, camera, renderer, clock;

export function initScene(canvas) {
  // ── Scene ──────────────────────────────────────
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030310);
  scene.fog = new THREE.FogExp2(0x030310, 0.022);

  // ── Camera ─────────────────────────────────────
  camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 120);
  camera.position.set(0, 3.5, 12);
  camera.lookAt(0, 1.5, 0);

  // ── Renderer ───────────────────────────────────
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;

  clock = new THREE.Clock();

  buildFloor();
  buildWalls();
  buildLights();
  buildParticles();
  buildCeiling();

  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  return { scene, camera, renderer, clock };
}

// ── Floor ───────────────────────────────────────
function buildFloor() {
  // Canvas texture: hex grid
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#06061a';
  ctx.fillRect(0, 0, 512, 512);

  // Hex grid lines
  ctx.strokeStyle = '#141440';
  ctx.lineWidth = 1;
  const R = 28, W = R * Math.sqrt(3), H = R * 2;
  for (let row = -2; row < 512 / H + 2; row++) {
    for (let col = -2; col < 512 / W + 2; col++) {
      const cx = col * W + (row % 2 === 0 ? 0 : W / 2);
      const cy = row * (H * 0.75);
      hexPath(ctx, cx, cy, R - 1);
      ctx.stroke();
    }
  }
  // Subtle glow dots at vertices
  ctx.fillStyle = 'rgba(0,245,255,0.06)';
  for (let i = 0; i < 80; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 512, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.repeat.set(6, 6);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;

  const geo = new THREE.PlaneGeometry(120, 120);
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9, metalness: 0.3 });
  const floor = new THREE.Mesh(geo, mat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
}

function hexPath(ctx, cx, cy, r) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    i === 0 ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
            : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
  }
  ctx.closePath();
}

// ── Walls (cylindrical room) ────────────────────
function buildWalls() {
  const geo = new THREE.CylinderGeometry(38, 38, 20, 32, 1, true);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x04041a, side: THREE.BackSide,
    roughness: 1, metalness: 0,
  });
  const walls = new THREE.Mesh(geo, mat);
  walls.position.y = 8;
  scene.add(walls);

  // Neon trim ring at base
  const ringGeo = new THREE.TorusGeometry(38, 0.08, 8, 80);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.02;
  scene.add(ring);
}

// ── Ceiling ─────────────────────────────────────
function buildCeiling() {
  const geo = new THREE.CircleGeometry(38, 32);
  const mat = new THREE.MeshStandardMaterial({ color: 0x030312, roughness: 1 });
  const ceil = new THREE.Mesh(geo, mat);
  ceil.rotation.x = Math.PI / 2;
  ceil.position.y = 18;
  scene.add(ceil);
}

// ── Lights ──────────────────────────────────────
export const spotLights = [];

export function buildLights() {
  // Ambient — very dim cool blue
  scene.add(new THREE.AmbientLight(0x0a0a2e, 0.8));

  // Hemisphere — sky/ground
  scene.add(new THREE.HemisphereLight(0x0d0d30, 0x000000, 0.5));

  // Per-pedestal spotlights
  const defs = [
    { color: 0x00f5ff, x: -5.5, z: -4 },   // cyan  — VisionSecure
    { color: 0xffb300, x:  0,   z: -10 },  // amber — Automobile App
    { color: 0xc400ff, x:  5.5, z: -4 },   // violet — LMS
  ];

  defs.forEach(({ color, x, z }) => {
    const spot = new THREE.SpotLight(color, 80, 22, Math.PI / 5, 0.5, 1.8);
    spot.position.set(x, 10, z);
    spot.target.position.set(x, 0, z);
    spot.castShadow = true;
    spot.shadow.mapSize.set(512, 512);
    scene.add(spot, spot.target);
    spotLights.push(spot);

    // Point light at pedestal base for glow
    const pt = new THREE.PointLight(color, 4, 8, 2);
    pt.position.set(x, 1.5, z);
    scene.add(pt);
  });

  // Centre fill light
  const centre = new THREE.PointLight(0x1a1a50, 6, 30);
  centre.position.set(0, 6, 0);
  scene.add(centre);
}

// ── Particles ────────────────────────────────────
export let particleMesh;

export function buildParticles() {
  const count = 1800;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 70;
    pos[i * 3 + 1] = Math.random() * 18;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 70;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

  const mat = new THREE.PointsMaterial({
    color: 0x4040aa, size: 0.06, transparent: true, opacity: 0.7,
    sizeAttenuation: true,
  });
  particleMesh = new THREE.Points(geo, mat);
  scene.add(particleMesh);
}
