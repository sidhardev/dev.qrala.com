// pedestals.js — 3 project pedestals + 3D icons + raycasting
import * as THREE from 'three';
import { scene } from './scene.js';

// ── Project Data ─────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 'vision-secure',
    name: 'VisionSecure',
    subtitle: 'AI Physical Safety Auditor',
    description: 'Acts as an automated, online security guard. Utilises AI to monitor live video feeds and instantly detects user-defined objects, anomalies, and physical altercations. Pushes detailed alerts with snapshot images directly to the user's Telegram via a custom Bot.',
    tech: ['PHP', 'Vanilla JavaScript', 'Tailwind CSS', 'AI / Vision Model', 'Telegram Bot API'],
    color: 0x00f5ff,
    colorHex: '#00f5ff',
    link: 'https://github.com/sidhardev',
    icon: 'lens',
    pos: { x: -5.5, z: -4 },
  },
  {
    id: 'automobile-backend',
    name: 'Automobile App',
    subtitle: 'Backend & Full-Stack Admin Panel',
    description: 'A highly robust backend infrastructure and comprehensive frontend Admin Panel built for a large-scale automotive platform. Features complex data modelling for vehicles, user roles, and inventory, plus full CRUD operations, content moderation, and system management.',
    tech: ['NestJS', 'React.js', 'Material UI (MUI)', 'REST API', 'Admin Dashboard'],
    color: 0xffb300,
    colorHex: '#ffb300',
    link: 'https://github.com/sidhardev',
    icon: 'car',
    pos: { x: 0, z: -10 },
  },
  {
    id: 'loyalty-management',
    name: 'Loyalty Management',
    subtitle: 'B2C Customer Retention Platform',
    description: 'A B2C loyalty and customer retention platform designed to track engagement and reward users dynamically. Features an advanced campaign management engine, promotional rules, and dynamic user segmentation based on engagement and purchase history.',
    tech: ['NestJS', 'React.js', 'Campaign Engine', 'User Segmentation', 'Transaction Handling'],
    color: 0xc400ff,
    colorHex: '#c400ff',
    link: 'https://github.com/sidhardev',
    icon: 'coin',
    pos: { x: 5.5, z: -4 },
  },
];

// ── Internal state ───────────────────────────────────────────
export const pedestalGroups = [];
const iconMeshes = [];
let raycaster, pointer, clickables = [];

export function initPedestals() {
  raycaster = new THREE.Raycaster();
  pointer   = new THREE.Vector2();

  PROJECTS.forEach((proj, i) => buildPedestal(proj, i));
  setupRaycasting();
  return pedestalGroups;
}

// ── Build a single pedestal group ───────────────────────────
function buildPedestal(proj, idx) {
  const group = new THREE.Group();
  const { x, z } = proj.pos;
  group.position.set(x, 0, z);
  group.userData = { projectIdx: idx };

  const col = proj.color;

  // Staircase steps (3 boxes, smallest on top)
  const steps = [
    { w: 2.8, h: 0.25, d: 2.8, y: 0.125 },
    { w: 2.2, h: 0.3,  d: 2.2, y: 0.425 },
    { w: 1.6, h: 0.35, d: 1.6, y: 0.8  },
    { w: 1.1, h: 0.4,  d: 1.1, y: 1.175 },
  ];

  steps.forEach(({ w, h, d, y }) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0a0a20,
      emissive: col,
      emissiveIntensity: 0.08,
      roughness: 0.3,
      metalness: 0.9,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = y;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  });

  // Glowing top platform
  const topGeo = new THREE.BoxGeometry(1.2, 0.06, 1.2);
  const topMat = new THREE.MeshStandardMaterial({
    color: col,
    emissive: col,
    emissiveIntensity: 0.6,
    roughness: 0.1, metalness: 1,
    transparent: true, opacity: 0.9,
  });
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.y = 1.42;
  group.add(top);

  // Glow ring around top
  const ringGeo = new THREE.TorusGeometry(0.72, 0.025, 8, 48);
  const ringMat = new THREE.MeshBasicMaterial({ color: col });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 1.45;
  group.add(ring);

  // 3D Icon on top
  const icon = buildIcon(proj.icon, col);
  icon.position.y = 2.1;
  group.add(icon);
  iconMeshes.push(icon);

  // Clickable invisible hit-box
  const hitGeo = new THREE.BoxGeometry(3.2, 3.5, 3.2);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  const hit = new THREE.Mesh(hitGeo, hitMat);
  hit.position.y = 1.5;
  hit.userData = { projectIdx: idx };
  group.add(hit);
  clickables.push(hit);

  // Label plane (project name floating above)
  buildFloatingLabel(proj.name, col, group);

  scene.add(group);
  pedestalGroups.push(group);
}

// ── Build 3D icon ────────────────────────────────────────────
function buildIcon(type, col) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: col, emissive: col, emissiveIntensity: 0.5,
    roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.92,
  });

  if (type === 'lens') {
    // Camera lens: nested tori + sphere (VisionSecure)
    const outer = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.07, 16, 48), mat);
    const inner = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 16, 48), mat.clone());
    const eye   = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16),
      new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 1.2, roughness: 0, metalness: 1 })
    );
    group.add(outer, inner, eye);

  } else if (type === 'car') {
    // Wireframe car silhouette (SG Automobiles)
    const bodyGeo = new THREE.BoxGeometry(0.9, 0.28, 0.45);
    const body = new THREE.Mesh(bodyGeo, mat);
    const roofGeo = new THREE.BoxGeometry(0.52, 0.22, 0.42);
    const roof = new THREE.Mesh(roofGeo, mat.clone());
    roof.position.set(0.02, 0.24, 0);
    // Wheel circles
    const wMat = new THREE.MeshBasicMaterial({ color: col });
    [-0.28, 0.28].forEach(xo => {
      [-0.23, 0.23].forEach(zo => {
        const w = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.03, 8, 24), wMat);
        w.rotation.y = Math.PI / 2;
        w.position.set(xo, -0.12, zo);
        group.add(w);
      });
    });
    // Headlight dot
    const hMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const hl = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), hMat);
    hl.position.set(0.46, 0, 0.16);
    group.add(body, roof, hl);

  } else if (type === 'coin') {
    // Flat spinning coin + star (LMS)
    const coinGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.06, 32);
    const coin = new THREE.Mesh(coinGeo, mat);
    // Star (5-pointed via shape)
    const star = buildStar(col);
    star.position.y = 0.04;
    group.add(coin, star);
  }

  return group;
}

function buildStar(col) {
  const shape = new THREE.Shape();
  const pts = 5, outer = 0.22, inner = 0.1;
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / pts) * i - Math.PI / 2;
    i === 0 ? shape.moveTo(r * Math.cos(a), r * Math.sin(a))
            : shape.lineTo(r * Math.cos(a), r * Math.sin(a));
  }
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.04, bevelEnabled: false });
  return new THREE.Mesh(geo,
    new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 1, roughness: 0 })
  );
}

// ── Floating label ───────────────────────────────────────────
function buildFloatingLabel(name, col, group) {
  // We'll use a canvas texture for the label
  const c = document.createElement('canvas');
  c.width = 512; c.height = 96;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 96);
  ctx.font = 'bold 40px Outfit, sans-serif';
  ctx.fillStyle = `#${col.toString(16).padStart(6,'0')}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.toUpperCase(), 256, 48);

  const tex = new THREE.CanvasTexture(c);
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2.8, 0.52),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
  );
  plane.position.y = 3.1;
  plane.userData.isLabel = true;
  group.add(plane);
}

// ── Raycasting setup ─────────────────────────────────────────
function setupRaycasting() {
  window.addEventListener('pointermove', (e) => {
    pointer.x =  (e.clientX / innerWidth)  * 2 - 1;
    pointer.y = -(e.clientY / innerHeight) * 2 + 1;
  });
}

// Called from main loop — handle hover glow
export function updatePedestalHover(camera) {
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(clickables);
  clickables.forEach(h => {
    const g = h.parent;
    g.children.forEach(c => {
      if (c.material && c.material.emissiveIntensity !== undefined && !c.userData.isLabel) {
        c.material.emissiveIntensity = 0.08;
      }
    });
  });
  if (hits.length > 0) {
    const g = hits[0].object.parent;
    document.body.style.cursor = 'pointer';
    g.children.forEach(c => {
      if (c.material && c.material.emissiveIntensity !== undefined && !c.userData.isLabel) {
        c.material.emissiveIntensity = 0.25;
      }
    });
  } else {
    document.body.style.cursor = 'default';
  }
}

// Called on click — returns project index or -1
export function checkPedestalClick(camera) {
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(clickables);
  if (hits.length > 0) return hits[0].object.userData.projectIdx;
  return -1;
}

// Animate icons (rotation) — called every frame
export function animatePedestals(t) {
  iconMeshes.forEach((icon, i) => {
    icon.rotation.y = t * 0.6 + i * (Math.PI * 2 / 3);
    icon.position.y = 2.1 + Math.sin(t * 1.1 + i) * 0.12;
  });

  // Labels always face camera (billboarding handled in main)
  pedestalGroups.forEach(g => {
    g.children.forEach(c => {
      if (c.userData.isLabel) {
        // billboarding done in main.js
      }
    });
  });
}
