/**
 * Fuzzy Chainsaw — fullscreen Three.js product viewer (r170 CDN / ES modules)
 * Exposes window.FCViewer.open(url, { name }) / .close()
 */
import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const MATTE_GRAY = 0x8e8e93;
const AUTO_YAW_RAD_PER_SEC = 0.35;
const REDUCED_YAW_RAD_PER_SEC = 0.04;

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
  return overlay;
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

function makeMatteMaterial() {
  return new THREE.MeshStandardMaterial({
    color: MATTE_GRAY,
    roughness: 0.82,
    metalness: 0.04,
    flatShading: false,
  });
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

function fitCameraToObject(camera, controls, object, offset = 1.45) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  object.position.sub(center);

  const box2 = new THREE.Box3().setFromObject(object);
  const size2 = box2.getSize(new THREE.Vector3());
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

  return { maxDim, size: size2 };
}

async function loadModel(url) {
  const lower = url.split('?')[0].toLowerCase();
  if (lower.endsWith('.stl')) {
    const geo = await new STLLoader().loadAsync(url);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, makeMatteMaterial());
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const group = new THREE.Group();
    group.add(mesh);
    return group;
  }
  if (lower.endsWith('.obj')) {
    const obj = await new OBJLoader().loadAsync(url);
    applyMaterial(obj, makeMatteMaterial());
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

function animate(now) {
  if (!state || !state.running) return;
  state.raf = requestAnimationFrame(animate);
  const dt = state.lastTs ? Math.min(0.05, (now - state.lastTs) / 1000) : 0.016;
  state.lastTs = now;

  if (state.model && !state.dragging && state.yawSpeed > 0) {
    state.model.rotation.y += state.yawSpeed * dt;
  }
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
  // Transparent clear so CSS gradient on .viewer3d-stage shows through
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
    raf: 0,
    lastTs: 0,
    onResize,
  };

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
    scene.add(model);
    state.model = model;

    const fit = fitCameraToObject(camera, controls, model, 1.55);
    // Place shadow plane just under model feet
    const box = new THREE.Box3().setFromObject(model);
    ground.position.y = box.min.y - 0.002;
    // Tighten shadow frustum to model size
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
