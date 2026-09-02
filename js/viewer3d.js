/**
 * Fuzzy Chainsaw — fullscreen Three.js product viewer (r170 CDN / ES modules)
 * Exposes window.FCViewer.open(url, { name }) / .close()
 *
 * Features: spin-axis control (X/Y/Z), color fade (Solid / Gradient / Mix),
 * Z-up STL orientation normalize, 3-point lighting, shadows, orbit pause.
 */
import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const AUTO_YAW_RAD_PER_SEC = 0.35;
const REDUCED_YAW_RAD_PER_SEC = 0.04;
const COLOR_TRANSITION_SEC = 11;
const MIX_PHASE_SEC = 14;
const MIX_BLEND_SEC = 2.5;

/** Matte solids used for color fade (slate, violet, teal, rose, warm gray, …) */
const SOLID_PALETTE = [
  new THREE.Color(0x64748b), // slate
  new THREE.Color(0x8b5cf6), // violet
  new THREE.Color(0x14b8a6), // teal
  new THREE.Color(0xf43f5e), // rose
  new THREE.Color(0xa8a29e), // warm gray
  new THREE.Color(0x38bdf8), // sky
  new THREE.Color(0xf59e0b), // amber
  new THREE.Color(0xc084fc), // soft purple
];

/** Paired tones for gradient-like two-color ramps */
const GRADIENT_PAIRS = [
  [new THREE.Color(0x312e81), new THREE.Color(0xa78bfa)],
  [new THREE.Color(0x134e4a), new THREE.Color(0x5eead4)],
  [new THREE.Color(0x4c0519), new THREE.Color(0xfb7185)],
  [new THREE.Color(0x1e293b), new THREE.Color(0x94a3b8)],
  [new THREE.Color(0x431407), new THREE.Color(0xfdba74)],
  [new THREE.Color(0x164e63), new THREE.Color(0x67e8f9)],
];

let state = null;

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (_) {
    return false;
  }
}

function ensureOverlay() {
  let overlay = document.getElementById('viewer3d-overlay');
  if (overlay) return overlay;

  overlay = document.createElement('div');
  overlay.id = 'viewer3d-overlay';
  overlay.className = 'viewer3d-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', '3D product viewer');
  overlay.innerHTML = `
    <div class="viewer3d-bar">
      <div class="viewer3d-title" id="viewer3d-title">3D View</div>
      <div class="viewer3d-controls" id="viewer3d-controls">
        <div class="viewer3d-control-group">
          <span class="viewer3d-control-label" id="viewer3d-spin-label">Spin axis</span>
          <div class="viewer3d-seg" role="group" aria-labelledby="viewer3d-spin-label">
            <button type="button" class="viewer3d-seg-btn" data-spin-axis="x" aria-pressed="false">X</button>
            <button type="button" class="viewer3d-seg-btn" data-spin-axis="y" aria-pressed="true">Y</button>
            <button type="button" class="viewer3d-seg-btn" data-spin-axis="z" aria-pressed="false">Z</button>
          </div>
        </div>
        <div class="viewer3d-control-group">
          <span class="viewer3d-control-label" id="viewer3d-color-label">Color mode</span>
          <div class="viewer3d-seg" role="group" aria-labelledby="viewer3d-color-label">
            <button type="button" class="viewer3d-seg-btn" data-color-mode="solid" aria-pressed="false">Solid</button>
            <button type="button" class="viewer3d-seg-btn" data-color-mode="gradient" aria-pressed="false">Gradient</button>
            <button type="button" class="viewer3d-seg-btn" data-color-mode="mix" aria-pressed="true">Mix</button>
          </div>
        </div>
      </div>
      <span class="viewer3d-hint">Drag to orbit · scroll to zoom</span>
      <button type="button" class="viewer3d-close" id="viewer3d-close" aria-label="Close 3D view">&times;</button>
    </div>
    <div class="viewer3d-stage" id="viewer3d-stage">
      <div class="viewer3d-status" id="viewer3d-status">
        <div>
          <div class="viewer3d-spinner" aria-hidden="true"></div>
          <div>Loading 3D model…</div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#viewer3d-close').addEventListener('click', () => close());

  overlay.querySelectorAll('[data-spin-axis]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const axis = btn.getAttribute('data-spin-axis');
      if (!axis || !state) return;
      setSpinAxis(axis);
    });
  });

  overlay.querySelectorAll('[data-color-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-color-mode');
      if (!mode || !state) return;
      setColorMode(mode);
    });
  });

  return overlay;
}

function syncAxisButtons(axis) {
  document.querySelectorAll('[data-spin-axis]').forEach((btn) => {
    const on = btn.getAttribute('data-spin-axis') === axis;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

function syncColorButtons(mode) {
  document.querySelectorAll('[data-color-mode]').forEach((btn) => {
    const on = btn.getAttribute('data-color-mode') === mode;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

function setSpinAxis(axis) {
  if (!state || !['x', 'y', 'z'].includes(axis)) return;
  state.spinAxis = axis;
  syncAxisButtons(axis);
}

function setColorMode(mode) {
  if (!state || !['solid', 'gradient', 'mix'].includes(mode)) return;
  state.colorMode = mode;
  state.mixPhaseT = 0;
  syncColorButtons(mode);
}

function setStatus(msg) {
  const el = document.getElementById('viewer3d-status');
  if (!el) return;
  if (!msg) {
    el.hidden = true;
    el.innerHTML = '';
    return;
  }
  el.hidden = false;
  el.innerHTML = `<div><div class="viewer3d-spinner" aria-hidden="true"></div><div>${msg}</div></div>`;
}

function disposeObject3D(obj) {
  if (!obj) return;
  obj.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((m) => {
        if (m.map) m.map.dispose();
        m.dispose();
      });
    }
  });
}

/**
 * MeshStandardMaterial with a soft two-tone gradient blend driven by uniforms.
 * gradAmount 0 = solid colorA; 1 = full A→B ramp along local up (bbox Y).
 */
function makeFadeMaterial(bboxMin, bboxMax) {
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.78,
    metalness: 0.05,
    flatShading: false,
  });

  const u = {
    fadeColorA: { value: SOLID_PALETTE[0].clone() },
    fadeColorB: { value: GRADIENT_PAIRS[0][1].clone() },
    gradAmount: { value: 0 },
    bboxMin: { value: bboxMin.clone() },
    bboxMax: { value: bboxMax.clone() },
  };

  mat.userData.fadeUniforms = u;
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, u);
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
varying float vFcGradT;
uniform vec3 bboxMin;
uniform vec3 bboxMax;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
{
  float denomY = max(bboxMax.y - bboxMin.y, 1e-5);
  float denomX = max(bboxMax.x - bboxMin.x, 1e-5);
  float denomZ = max(bboxMax.z - bboxMin.z, 1e-5);
  // Prefer the longest local axis for the ramp so tall/wide models look good
  float sx = bboxMax.x - bboxMin.x;
  float sy = bboxMax.y - bboxMin.y;
  float sz = bboxMax.z - bboxMin.z;
  if (sy >= sx && sy >= sz) {
    vFcGradT = clamp((position.y - bboxMin.y) / denomY, 0.0, 1.0);
  } else if (sz >= sx && sz >= sy) {
    vFcGradT = clamp((position.z - bboxMin.z) / denomZ, 0.0, 1.0);
  } else {
    vFcGradT = clamp((position.x - bboxMin.x) / denomX, 0.0, 1.0);
  }
}`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
varying float vFcGradT;
uniform vec3 fadeColorA;
uniform vec3 fadeColorB;
uniform float gradAmount;`
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
{
  float t = smoothstep(0.0, 1.0, vFcGradT);
  vec3 gradCol = mix(fadeColorA, fadeColorB, t);
  vec3 solidCol = fadeColorA;
  diffuseColor.rgb *= mix(solidCol, gradCol, clamp(gradAmount, 0.0, 1.0));
}`
      );
  };
  mat.customProgramCacheKey = () => 'fc-viewer-color-fade-v1';
  return mat;
}

function applyMaterial(root, material) {
  root.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}

/**
 * Center model; for clearly Z-up STLs map Z→Y once. Returns suggested spin axis.
 */
function normalizeOrientation(model, isStl) {
  model.updateMatrixWorld(true);
  let box = new THREE.Box3().setFromObject(model);
  let size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);

  let remappedZUp = false;
  if (isStl) {
    // Classic print/CAD Z-up: height along Z dominates Y
    if (size.z >= size.y * 1.12 && size.z >= size.x * 0.85) {
      model.rotation.x = -Math.PI / 2;
      remappedZUp = true;
    }
  }

  model.updateMatrixWorld(true);
  box = new THREE.Box3().setFromObject(model);
  model.position.sub(box.getCenter(new THREE.Vector3()));

  model.updateMatrixWorld(true);
  box = new THREE.Box3().setFromObject(model);
  size = box.getSize(new THREE.Vector3());

  // Turntable default: spin around the longest dimension (object "height")
  let spinAxis = 'y';
  if (size.y >= size.x && size.y >= size.z) spinAxis = 'y';
  else if (size.z >= size.x && size.z >= size.y) spinAxis = 'z';
  else spinAxis = 'x';

  // After Z→Y remap, prefer Y turntable even if another dim is slightly longer
  if (remappedZUp) spinAxis = 'y';

  return { spinAxis, size, box };
}


/** Bake current world transforms into geometries so local Y matches visual up. */
function bakeWorldTransforms(model) {
  model.updateMatrixWorld(true);
  const meshes = [];
  model.traverse((child) => {
    if (child.isMesh && child.geometry) meshes.push(child);
  });
  meshes.forEach((mesh) => {
    const baked = mesh.geometry.clone();
    baked.applyMatrix4(mesh.matrixWorld);
    mesh.geometry.dispose();
    mesh.geometry = baked;
    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(1, 1, 1);
    mesh.updateMatrix();
  });
  model.position.set(0, 0, 0);
  model.rotation.set(0, 0, 0);
  model.scale.set(1, 1, 1);
  model.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  meshes.forEach((mesh) => {
    mesh.geometry.translate(-center.x, -center.y, -center.z);
    mesh.geometry.computeBoundingBox();
    mesh.geometry.computeVertexNormals();
  });
  model.updateMatrixWorld(true);
}

function fitCameraToObject(camera, controls, object, offset = 1.45) {
  const box = new THREE.Box3().setFromObject(object);
  const size2 = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size2.x, size2.y, size2.z, 0.001);
  const fov = (camera.fov * Math.PI) / 180;
  let dist = (maxDim / (2 * Math.tan(fov / 2))) * offset;
  dist = Math.max(dist, maxDim * 1.2);

  camera.near = Math.max(dist / 100, 0.01);
  camera.far = dist * 100;
  camera.position.set(dist * 0.55, dist * 0.35, dist * 0.9);
  camera.lookAt(0, size2.y * 0.05, 0);
  camera.updateProjectionMatrix();

  if (controls) {
    controls.target.set(0, size2.y * 0.05, 0);
    controls.minDistance = maxDim * 0.4;
    controls.maxDistance = dist * 4;
    controls.update();
  }

  return { maxDim, size: size2, box };
}


async function loadModel(url) {
  const lower = url.split('?')[0].toLowerCase();
  if (lower.endsWith('.stl')) {
    const geo = await new STLLoader().loadAsync(url);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial());
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const group = new THREE.Group();
    group.add(mesh);
    group.userData.isStl = true;
    return group;
  }
  if (lower.endsWith('.obj')) {
    const obj = await new OBJLoader().loadAsync(url);
    obj.userData.isStl = false;
    return obj;
  }
  throw new Error('Unsupported 3D format (use .stl or .obj)');
}

function onKeyDown(e) {
  if (e.key === 'Escape') close();
}

function onResize() {
  if (!state) return;
  const { renderer, camera, stage } = state;
  const w = stage.clientWidth || window.innerWidth;
  const h = stage.clientHeight || window.innerHeight;
  camera.aspect = w / Math.max(h, 1);
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}

function advanceColorFade(dt) {
  const s = state;
  if (!s || !s.fadeUniforms) return;

  s.colorT += dt;
  const period = prefersReducedMotion() ? COLOR_TRANSITION_SEC * 2.5 : COLOR_TRANSITION_SEC;

  while (s.colorT >= period) {
    s.colorT -= period;
    s.solidIndex = (s.solidIndex + 1) % SOLID_PALETTE.length;
    s.gradIndex = (s.gradIndex + 1) % GRADIENT_PAIRS.length;
  }

  const u = s.colorT / period;
  // Smoothstep ease between palette entries
  const ease = u * u * (3 - 2 * u);

  const solidA = SOLID_PALETTE[s.solidIndex];
  const solidB = SOLID_PALETTE[(s.solidIndex + 1) % SOLID_PALETTE.length];
  const pairA = GRADIENT_PAIRS[s.gradIndex];
  const pairB = GRADIENT_PAIRS[(s.gradIndex + 1) % GRADIENT_PAIRS.length];

  const solidNow = solidA.clone().lerp(solidB, ease);
  const gradLo = pairA[0].clone().lerp(pairB[0], ease);
  const gradHi = pairA[1].clone().lerp(pairB[1], ease);

  let gradAmount = 0;
  const mode = s.colorMode || 'mix';

  if (mode === 'solid') {
    gradAmount = 0;
    s.fadeUniforms.fadeColorA.value.copy(solidNow);
    s.fadeUniforms.fadeColorB.value.copy(solidNow);
  } else if (mode === 'gradient') {
    gradAmount = 1;
    s.fadeUniforms.fadeColorA.value.copy(gradLo);
    s.fadeUniforms.fadeColorB.value.copy(gradHi);
  } else {
    // Mix: alternate solid ↔ gradient phases with soft crossfade
    s.mixPhaseT += dt;
    const cycle = MIX_PHASE_SEC * 2;
    const t = s.mixPhaseT % cycle;
    if (t < MIX_PHASE_SEC) {
      // solid → hold → blend to gradient
      if (t < MIX_PHASE_SEC - MIX_BLEND_SEC) {
        gradAmount = 0;
        s.fadeUniforms.fadeColorA.value.copy(solidNow);
        s.fadeUniforms.fadeColorB.value.copy(solidNow);
      } else {
        const b = (t - (MIX_PHASE_SEC - MIX_BLEND_SEC)) / MIX_BLEND_SEC;
        gradAmount = b;
        s.fadeUniforms.fadeColorA.value.copy(solidNow).lerp(gradLo, b);
        s.fadeUniforms.fadeColorB.value.copy(solidNow).lerp(gradHi, b);
      }
    } else {
      const t2 = t - MIX_PHASE_SEC;
      if (t2 < MIX_PHASE_SEC - MIX_BLEND_SEC) {
        gradAmount = 1;
        s.fadeUniforms.fadeColorA.value.copy(gradLo);
        s.fadeUniforms.fadeColorB.value.copy(gradHi);
      } else {
        const b = (t2 - (MIX_PHASE_SEC - MIX_BLEND_SEC)) / MIX_BLEND_SEC;
        gradAmount = 1 - b;
        s.fadeUniforms.fadeColorA.value.copy(gradLo).lerp(solidNow, b);
        s.fadeUniforms.fadeColorB.value.copy(gradHi).lerp(solidNow, b);
      }
    }
  }

  s.fadeUniforms.gradAmount.value = gradAmount;
}

function animate(now) {
  if (!state || !state.running) return;
  state.raf = requestAnimationFrame(animate);
  const dt = state.lastTs ? Math.min(0.05, (now - state.lastTs) / 1000) : 0.016;
  state.lastTs = now;

  if (state.model && !state.dragging && state.yawSpeed > 0) {
    const axis = state.spinAxis || 'y';
    const worldAxis =
      axis === 'x' ? state._axisX : axis === 'z' ? state._axisZ : state._axisY;
    state.model.rotateOnWorldAxis(worldAxis, state.yawSpeed * dt);
  }

  advanceColorFade(dt);
  state.controls.update();
  state.renderer.render(state.scene, state.camera);
}

async function open(modelUrl, opts = {}) {
  if (!modelUrl) {
    if (window.FC && typeof FC.toast === 'function') FC.toast('3D preview coming soon');
    return;
  }

  close();

  const overlay = ensureOverlay();
  const stage = overlay.querySelector('#viewer3d-stage');
  const titleEl = overlay.querySelector('#viewer3d-title');
  titleEl.textContent = opts.name ? `${opts.name} · 3D View` : '3D View';
  setStatus('Loading 3D model…');

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onKeyDown);

  const w = stage.clientWidth || window.innerWidth;
  const h = stage.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(42, w / Math.max(h, 1), 0.1, 2000);
  camera.position.set(2, 1.2, 2.5);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h, false);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  if ('outputColorSpace' in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.appendChild(renderer.domElement);

  // Classic 3-point studio lighting
  const hemi = new THREE.HemisphereLight(0xb0b0b8, 0x1a1a1e, 0.35);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(4.5, 7, 3.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 40;
  key.shadow.camera.left = -8;
  key.shadow.camera.right = 8;
  key.shadow.camera.top = 8;
  key.shadow.camera.bottom = -8;
  key.shadow.bias = -0.0002;
  key.shadow.radius = 3;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xc8d0e0, 0.45);
  fill.position.set(-5, 3, 2);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xffffff, 0.55);
  rim.position.set(-1.5, 4, -6);
  scene.add(rim);

  // Soft shadow catcher
  const groundGeo = new THREE.PlaneGeometry(40, 40);
  const groundMat = new THREE.ShadowMaterial({ opacity: 0.38 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  scene.add(ground);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.target.set(0, 0.4, 0);

  const reduced = prefersReducedMotion();
  const yawSpeed = reduced ? REDUCED_YAW_RAD_PER_SEC : AUTO_YAW_RAD_PER_SEC;

  state = {
    overlay,
    stage,
    scene,
    camera,
    renderer,
    controls,
    model: null,
    ground,
    running: true,
    dragging: false,
    yawSpeed,
    spinAxis: 'y',
    colorMode: 'mix',
    colorT: 0,
    mixPhaseT: 0,
    solidIndex: 0,
    gradIndex: 0,
    fadeUniforms: null,
    material: null,
    raf: 0,
    lastTs: 0,
    onResize,
    _axisX: new THREE.Vector3(1, 0, 0),
    _axisY: new THREE.Vector3(0, 1, 0),
    _axisZ: new THREE.Vector3(0, 0, 1),
  };

  syncAxisButtons('y');
  syncColorButtons('mix');

  controls.addEventListener('start', () => {
    if (state) state.dragging = true;
  });
  controls.addEventListener('end', () => {
    if (state) state.dragging = false;
  });

  window.addEventListener('resize', onResize);

  try {
    const model = await loadModel(modelUrl);
    if (!state || state.renderer !== renderer) {
      disposeObject3D(model);
      return;
    }

    const isStl = !!model.userData.isStl || /\.stl(\?|$)/i.test(modelUrl);
    const norm = normalizeOrientation(model, isStl);
    bakeWorldTransforms(model);
    // Re-evaluate size after bake for turntable axis (Z→Y already applied)
    model.updateMatrixWorld(true);
    const sizeAfter = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
    let spinAxis = norm.spinAxis;
    if (sizeAfter.y >= sizeAfter.x && sizeAfter.y >= sizeAfter.z) spinAxis = 'y';
    else if (sizeAfter.z >= sizeAfter.x && sizeAfter.z >= sizeAfter.y) spinAxis = 'z';
    else spinAxis = 'x';
    // Prefer Y turntable when we remapped Z-up STL
    if (isStl && Math.abs(sizeAfter.y - Math.max(sizeAfter.x, sizeAfter.y, sizeAfter.z)) < 1e-6) {
      spinAxis = 'y';
    }
    state.spinAxis = spinAxis;
    syncAxisButtons(spinAxis);

    // Geometry-local bbox for gradient shader (after bake / center)
    const geoBox = new THREE.Box3();
    model.traverse((child) => {
      if (child.isMesh && child.geometry) {
        child.geometry.computeBoundingBox();
        geoBox.union(child.geometry.boundingBox);
      }
    });
    const material = makeFadeMaterial(geoBox.min, geoBox.max);
    applyMaterial(model, material);
    state.material = material;
    state.fadeUniforms = material.userData.fadeUniforms;

    scene.add(model);
    state.model = model;

    const fit = fitCameraToObject(camera, controls, model, 1.55);
    const box = new THREE.Box3().setFromObject(model);
    ground.position.y = box.min.y - 0.002;

    const extent = Math.max(fit.maxDim * 1.4, 2);
    key.shadow.camera.left = -extent;
    key.shadow.camera.right = extent;
    key.shadow.camera.top = extent;
    key.shadow.camera.bottom = -extent;
    key.shadow.camera.updateProjectionMatrix();
    key.position.set(extent * 0.7, extent * 1.1, extent * 0.55);

    setStatus(null);
    state.raf = requestAnimationFrame(animate);
  } catch (err) {
    console.error('[FCViewer]', err);
    setStatus('Could not load 3D model. Try again later.');
    if (window.FC && typeof FC.toast === 'function') FC.toast('3D model failed to load');
  }
}

function close() {
  document.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('resize', onResize);
  document.body.style.overflow = '';

  const overlay = document.getElementById('viewer3d-overlay');
  if (overlay) overlay.classList.remove('open');

  if (!state) return;

  state.running = false;
  if (state.raf) cancelAnimationFrame(state.raf);

  try {
    state.controls.dispose();
  } catch (_) { /* ignore */ }

  if (state.model) {
    state.scene.remove(state.model);
    disposeObject3D(state.model);
  }
  if (state.ground) {
    state.scene.remove(state.ground);
    disposeObject3D(state.ground);
  }

  try {
    state.renderer.dispose();
    state.renderer.forceContextLoss && state.renderer.forceContextLoss();
  } catch (_) { /* ignore */ }

  if (state.renderer && state.renderer.domElement && state.renderer.domElement.parentNode) {
    state.renderer.domElement.parentNode.removeChild(state.renderer.domElement);
  }

  setStatus(null);
  state = null;
}

function resolveModelUrl(product) {
  if (!product || !product.downloads) return null;
  const d = product.downloads;
  const rel = d.stl || d.obj || null;
  if (!rel) return null;
  if (window.FC && typeof FC.assetUrl === 'function') return FC.assetUrl(rel);
  return rel;
}

window.FCViewer = {
  open,
  close,
  resolveModelUrl,
  isOpen: () => !!state,
};

export { open, close, resolveModelUrl };
