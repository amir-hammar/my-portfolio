// COSMOS — your real site structure, flown through the galaxy.
//
// v3 changes:
//   · no rocks, no planets — the only solid objects are ring structures
//   · 23,500 shader stars (was 8,700) plus a granulated star field baked
//     into the sky itself, which is what actually makes a galaxy look "milky"
//   · the Milky Way is rebuilt: narrow bright ridge inside a wide halo, a
//     bulge that widens toward the galactic centre, branching dark dust
//     lanes that absorb, and unresolved star granulation following the band
//   · every section now has a constellation you *arrive at* — its lines draw
//     themselves in as you approach, its stars flare, then it falls behind
//
// Bundled into 10-cosmos.html by build.mjs.
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TR, SKILLS, CAREER, PROJECTS, ICONS, SOCIAL_SVG } from './10-cosmos.content.js';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const A = window.__ASSETS || {};

const _mq = new URLSearchParams(location.search).get('motion');
const systemReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let reduce = _mq === 'full' ? false : _mq === 'reduced' ? true : systemReduce;

// Software (non-GPU-accelerated) WebGL renderers — SwiftShader, llvmpipe, the
// "Microsoft Basic Render Driver" — can technically run this scene but at a
// fraction of the frame rate, which reads as lag rather than a flight. Route
// those visitors through the same single-frame reduced-motion path used for
// prefers-reduced-motion, unless they've explicitly asked for full motion.
function isSoftwareRenderer(gl) {
  if (!gl) return false;
  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  const name = (dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)) || '';
  return /swiftshader|llvmpipe|software|basic render|microsoft basic/i.test(name);
}
let lowPower = false;

/* ============================================================
   CONTENT (mirrors the real components)
   ============================================================ */
let lang = 'en';
const pick = (v) => (typeof v === 'string' ? v : v[lang]);

document.getElementById('avatar').src = A.avatar || '';
document.getElementById('ets').src = A.ets || '';
document.getElementById('hero-socials').innerHTML = SOCIAL_SVG;
document.getElementById('footer-socials').innerHTML = SOCIAL_SVG;

function renderContent() {
  const t = TR[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    let v = t;
    for (const k of el.dataset.i18n.split('.')) v = v?.[k];
    if (typeof v === 'string') el.textContent = v;
  });

  document.getElementById('skills').innerHTML = SKILLS.map((s) => `
    <div class="skill-card">
      <svg class="ico" viewBox="0 0 24 24"><path d="${ICONS[s.icon]}"/></svg>
      <h3>${s[lang]}</h3>
      <div class="chips">${s.items.map((i) => `<span class="chip">${pick(i)}</span>`).join('')}</div>
    </div>`).join('');

  document.getElementById('timeline').innerHTML = CAREER.map((j) => `
    <div class="tl-item">
      <div class="marker"><img src="${A[j.logo] || ''}" alt="${pick(j.company)}"></div>
      <div class="tl-card">
        <div class="when">${pick(j.date)}</div>
        <h3>${pick(j.title)}</h3>
        <div class="co">${pick(j.company)} — ${j.city}</div>
        <ul>${j.tasks[lang].map((x) => `<li>${x}</li>`).join('')}</ul>
        <div class="stack">${j.stack.map((s) => `<span>${s}</span>`).join('')}</div>
      </div>
    </div>`).join('');

  document.getElementById('projects-grid').innerHTML = PROJECTS.map((p) => `
    <article class="proj">
      <div class="shots">${p.imgs.map((k) => `<img src="${A[k] || ''}" alt="${pick(p.title)}" loading="lazy">`).join('')}</div>
      <div class="body"><h3>${pick(p.title)}</h3><p>${p[lang]}</p></div>
    </article>`).join('');
}
renderContent();

document.getElementById('lang-btn').addEventListener('click', (e) => {
  lang = lang === 'en' ? 'fr' : 'en';
  e.currentTarget.textContent = lang === 'en' ? 'FR' : 'EN';
  document.documentElement.lang = lang;
  renderContent();
  ScrollTrigger.refresh();
});

const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), { passive: true });

/* ---------- smooth section transitions ----------
   Native scroll-behavior:smooth is disabled by the OS reduced-motion setting,
   which is why these jumped. GSAP gives us an eased, interruptible scroll and
   lets us honour the in-page motion toggle instead of the raw OS flag. */
function smoothScrollTo(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  const navH = nav.offsetHeight || 62;
  if (reduce) {
    window.scrollTo(0, el.getBoundingClientRect().top + scrollY - navH);
    return;
  }
  // distance-aware duration so short hops aren't sluggish and long ones aren't frantic
  const dist = Math.abs(el.getBoundingClientRect().top - navH);
  const dur = Math.min(1.6, Math.max(0.75, dist / 2200 + 0.65));
  gsap.to(window, {
    duration: dur,
    ease: 'power2.inOut',
    scrollTo: { y: el, offsetY: navH, autoKill: true },   // autoKill: user scroll wins
    overwrite: 'auto',
  });
}

document.querySelectorAll('#nav .links a[href^="#"], .badge[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    smoothScrollTo(href);
    history.replaceState(null, '', href);
  });
});

/* ============================================================
   THE GALAXY
   ============================================================ */
const canvas = document.getElementById('gl');
let renderer = null;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); } catch (e) { renderer = null; }

if (renderer && isSoftwareRenderer(renderer.getContext())) {
  lowPower = true;
  if (_mq !== 'full') reduce = true;
}

const flight = { p: 0 };

if (!renderer) {
  canvas.style.background =
    'radial-gradient(58% 44% at 50% 30%, rgba(59,107,240,.22), transparent 70%), ' +
    'radial-gradient(70% 60% at 70% 80%, rgba(27,58,168,.20), transparent 72%), #03050d';
} else {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(62, 2, 0.5, 8000);

  const NOISE = /* glsl */ `
    float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123); }
    float noise(vec3 p){
      vec3 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(mix(hash(i),               hash(i + vec3(1,0,0)), f.x),
                     mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                 mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                     mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
    }
    float fbm(vec3 p, int oct){
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 8; i++) { if (i >= oct) break; v += a * noise(p); p *= 2.07; a *= 0.5; }
      return v;
    }
    float ridged(vec3 p, int oct){
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 8; i++) { if (i >= oct) break; v += a * (1.0 - abs(noise(p) * 2.0 - 1.0)); p *= 2.13; a *= 0.5; }
      return v;
    }
    // One layer of resolved stars. Brightness follows a power law so most are
    // faint and a few are bright — that distribution is what a real star field
    // looks like. smoothstep rather than step so they don't shimmer.
    float starLayer(vec3 d, float scale, float thresh, float seedOff){
      vec3 cell = floor(d * scale);
      float h = hash(cell + seedOff);
      float on = smoothstep(thresh, thresh + 0.0011, h);
      float b  = pow(hash(cell + seedOff + 41.0), 3.2);
      return on * (0.22 + b * 2.4);
    }
  `;

  /* ============================================================
     MILKY WAY — rebuilt.
     The illusion depends on three things a plain gradient can't give you:
       1. unresolved star granulation (the actual "milk")
       2. dust lanes that ABSORB and branch, not a drawn stripe
       3. a core bulge that is both brighter AND wider than the arms
     ============================================================ */
  const SKY = new THREE.Mesh(
    // 96x60 segments on a radius-3400 sphere meant huge triangles; vDir was
    // linearly interpolated across them at reduced (mediump) precision on
    // some GPUs, and since the star layers multiply vDir by up to 15000x,
    // that tiny interpolation error got amplified into visible flat "broken
    // glass" panels along triangle edges. Finer geometry shrinks the error
    // each triangle can accumulate before it gets blown up downstream.
    new THREE.SphereGeometry(3400, 200, 130),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        uTime:    { value: 0 },
        uTint:    { value: new THREE.Color(0x0a1330) },
        uTintAmt: { value: 0.1 },
        uBright:  { value: 1 },
      },
      vertexShader: `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: 'precision highp float;\n' + NOISE + `
        varying vec3 vDir;
        uniform float uTime, uTintAmt, uBright;
        uniform vec3  uTint;

        void main() {
          // renormalize: interpolation across a triangle can leave vDir
          // slightly off unit length even before precision is the issue
          vec3 d = normalize(vDir);

          vec3 axis    = normalize(vec3(0.32, 1.0, 0.14));
          vec3 coreDir = normalize(vec3(-0.70, -0.10, 0.70));
          float lat    = dot(d, axis);
          float toCore = max(0.0, dot(d, coreDir));

          // --- band geometry: bulge is wider as well as brighter ---
          float widen = 1.0 + pow(toCore, 2.6) * 4.2;
          float ridge = exp(-lat * lat * 240.0 / widen);
          float halo  = exp(-lat * lat * 100.0 / widen);
          float wide  = exp(-lat * lat *  10.0);

          float c1 = fbm(d * 2.2 + vec3(0.0, 0.0, uTime * 0.003), 6);
          float c2 = ridged(d * 5.2, 5);
          float c3 = fbm(d * 12.0, 4);

          float band = ridge * 1.45 + halo * 0.20 + wide * 0.03;
          band *= (0.32 + c1 * 1.25) * (0.48 + c2 * 0.92);
          band += pow(toCore, 7.0) * exp(-lat * lat * 34.0) * 0.85;
          float bandN = clamp(band, 0.0, 1.6);

          // --- dust: three branching rifts that ABSORB ---
          float o1 = lat + (c1 - 0.5) * 0.085;
          float o2 = lat + (c2 - 0.5) * 0.125 - 0.014;
          float o3 = lat + (c3 - 0.5) * 0.050 + 0.022;
          float dust = clamp(exp(-o1 * o1 *  820.0) * 0.90
                           + exp(-o2 * o2 * 2400.0) * 0.70
                           + exp(-o3 * o3 * 5200.0) * 0.50, 0.0, 1.0);
          dust *= 0.26 + 0.74 * ridged(d * 9.0, 5);
          dust *= 0.38 + 0.62 * toCore;

          // --- diffuse glow ---
          vec3 deep  = vec3(0.004, 0.008, 0.026);
          vec3 royal = vec3(0.085, 0.150, 0.460);
          vec3 pale  = vec3(0.820, 0.880, 1.000);
          vec3 white = vec3(1.0);

          vec3 col = deep;
          col = mix(col, royal, clamp((band - 0.20) * 1.25, 0.0, 1.0));
          col = mix(col, pale,  clamp(band * band * 0.75, 0.0, 1.0));
          col += white * pow(toCore, 12.0) * exp(-lat * lat * 44.0) * 0.70;
          col *= 1.0 - dust * 0.88;

          // --- resolved stars: dense EVERYWHERE, denser in the band.
          //     This is the main thing the reference photo has that a
          //     gradient does not — the whole sky is granular. ---
          float stars = 0.0;
          stars += starLayer(d,   760.0, 0.99720 - bandN * 0.0030,  0.0) * 1.00;
          stars += starLayer(d,  1500.0, 0.99620 - bandN * 0.0055,  7.0) * 0.80;
          stars += starLayer(d,  2900.0, 0.99500 - bandN * 0.0080, 13.0) * 0.58;
          stars += starLayer(d,  5200.0, 0.99420 - bandN * 0.0105, 23.0) * 0.40;
          stars += starLayer(d,  7000.0, 0.99360 - bandN * 0.0125, 37.0) * 0.26;
          stars += starLayer(d,  9500.0, 0.99320 - bandN * 0.0140, 61.0) * 0.16;

          // dust hides the stars behind it too
          stars *= 1.0 - dust * 0.62;

          float tw = 0.78 + 0.22 * sin(uTime * 1.8 + hash(floor(d * 760.0)) * 90.0);
          col += mix(pale, white, 0.62) * stars * (0.50 + bandN * 0.30) * tw;

          col *= 0.86 + c3 * 0.34;

          float lum = dot(col, vec3(0.299, 0.587, 0.114));
          col = mix(col, uTint * lum * 2.4, uTintAmt * clamp(bandN * 1.7, 0.0, 1.0));
          col *= uBright;

          // final grade: neutral by default, blue only where the galaxy
          // structure actually is — this is what keeps the open sky black.
          float gray = dot(col, vec3(0.299, 0.587, 0.114));
          col = mix(vec3(gray), col, clamp(bandN * 2.4 + toCore * 0.7 + stars * 0.4, 0.0, 1.0));

          gl_FragColor = vec4(col, 1.0);
        }`,
    })
  );
  SKY.frustumCulled = false;
  scene.add(SKY);

  /* ============================================================
     STARS — 23,500 across four depths. Round core, diffraction
     spikes, colour temperature, twinkle.
     ============================================================ */
  const STAR_VERT = `
    attribute float aSize; attribute float aSeed; attribute vec3 aColor;
    uniform float uTime, uPixelRatio;
    varying vec3 vColor; varying float vTwinkle;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = aSize * uPixelRatio * (420.0 / max(-mv.z, 1.0));
      vColor = aColor;
      vTwinkle = 0.60 + 0.40 * sin(uTime * (1.0 + aSeed * 2.6) + aSeed * 62.0);
    }`;

  const STAR_FRAG = `
    varying vec3 vColor; varying float vTwinkle;
    void main() {
      vec2 c = gl_PointCoord - 0.5;
      float r = length(c);
      if (r > 0.5) discard;
      float core = pow(smoothstep(0.5, 0.0, r), 3.4);
      float halo = pow(smoothstep(0.5, 0.0, r), 1.25) * 0.30;
      float sx = max(0.0, 1.0 - abs(c.y) * 34.0) * max(0.0, 1.0 - abs(c.x) * 2.2);
      float sy = max(0.0, 1.0 - abs(c.x) * 34.0) * max(0.0, 1.0 - abs(c.y) * 2.2);
      float a = (core + halo + (sx + sy) * 0.42) * vTwinkle;
      if (a < 0.004) discard;
      gl_FragColor = vec4(vColor, a);
    }`;

  const starMats = [];
  function starField(count, spread, depth, sizeMin, sizeMax) {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const seed = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.7;
      pos[i * 3 + 2] = 300 - Math.random() * depth;
      size[i] = sizeMin + Math.pow(Math.random(), 2.8) * (sizeMax - sizeMin);
      seed[i] = Math.random();
      const t = Math.random();
      if (t < 0.58)      c.setHex(0xffffff);
      else if (t < 0.87) c.setHex(0xc8d8ff);
      else               c.setHex(0x6f95ff);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    g.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    const m = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
      vertexShader: STAR_VERT, fragmentShader: STAR_FRAG,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    });
    const pts = new THREE.Points(g, m);
    pts.frustumCulled = false;
    scene.add(pts);
    starMats.push(m);
  }
  starField(14000, 1000, 3000, 0.6, 2.2);   // dense fine dust of stars
  starField(7500, 1500, 3200, 1.1, 3.6);
  starField(3400, 2200, 3400, 1.8, 5.6);
  starField(1400, 3000, 3600, 2.6, 8.5);    // the few big bright ones

  /* ============================================================
     FLIGHT — pure cardinal moves between fixed destinations.

     The camera NEVER rotates: it always faces -Z, and travel is a straight
     translation along exactly one world axis per section. A curve blends two
     axes at once, which is what made it feel like several directions were
     happening together.

     Right, down, left and up each appear once. Unequal leg lengths are what
     let all four directions be used without landing back at the start.
     ============================================================ */
  const STEP_W = 190;    // horizontal step
  const STEP_H = 135;    // vertical step
  const DRIFT  = 1150;   // constant forward travel across the whole scroll

  // Forward drift runs continuously underneath the cardinal steps. It is what
  // makes this read as flying rather than sliding, and it removes the dead
  // stretch where a leg was parked and nothing on screen moved at all.
  const driftZ = (p) => -DRIFT * THREE.MathUtils.clamp(p, 0, 1);

  const STOPS = [
    { key: 'HERO',      pos: new THREE.Vector3(         0,        0, 0), move: 'start' },
    { key: 'EXPERTISE', pos: new THREE.Vector3( 2*STEP_W,        0, 0), move: 'right' },
    { key: 'CAREER',    pos: new THREE.Vector3( 2*STEP_W,  -STEP_H, 0), move: 'down'  },
    { key: 'PROJECTS',  pos: new THREE.Vector3(   STEP_W,  -STEP_H, 0), move: 'left'  },
    { key: 'CONTACT',   pos: new THREE.Vector3(   STEP_W,   STEP_H, 0), move: 'up'    },
  ];
  const LEGS = STOPS.length - 1;

  // Each leg holds still, travels through the middle, then settles again — so
  // you read a section parked, and only move between them.
  const sstep = (a, b, x) => {
    const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  const _camTarget = new THREE.Vector3();
  const _moveDir = new THREE.Vector3(0, 0, -1);
  let currentLeg = 0, legEase = 0;

  function flightPosition(p) {
    const f = THREE.MathUtils.clamp(p, 0, 1) * LEGS;
    const i = Math.min(LEGS - 1, Math.floor(f));
    const local = f - i;
    const e = sstep(0.10, 0.94, local);
    currentLeg = i;
    legEase = e;
    _camTarget.copy(STOPS[i].pos).lerp(STOPS[i + 1].pos, e);
    _moveDir.copy(STOPS[i + 1].pos).sub(STOPS[i].pos).normalize();
    return _camTarget;
  }

  /* ---------- REGIONS, one per stop ---------- */
  scene.fog = new THREE.FogExp2(0x03050d, 0.00060);
  const REGIONS = [
    { fog: 0x030509, density: 0.00050, tint: 0x070c1e, amt: 0.08, bright: 0.96, name: 'GALACTIC CORE' },
    { fog: 0x0d1938, density: 0.00090, tint: 0x1a3070, amt: 0.26, bright: 1.02, name: 'STAR CLUSTER' },
    { fog: 0x101f4a, density: 0.00120, tint: 0x24408f, amt: 0.30, bright: 0.98, name: 'NEBULA' },
    { fog: 0x020308, density: 0.00040, tint: 0x040814, amt: 0.16, bright: 0.78, name: 'DEEP FIELD' },
    { fog: 0x0d1938, density: 0.00080, tint: 0x27417f, amt: 0.20, bright: 0.96, name: 'BINARY SYSTEM' },
  ];
  const cA = new THREE.Color(), cB = new THREE.Color(), tA = new THREE.Color(), tB = new THREE.Color();
  let currentRegion = REGIONS[0].name;

  function applyRegion() {
    const a = REGIONS[currentLeg];
    const b = REGIONS[Math.min(REGIONS.length - 1, currentLeg + 1)];
    cA.setHex(a.fog); cB.setHex(b.fog);
    scene.fog.color.copy(cA).lerp(cB, legEase);
    scene.fog.density = THREE.MathUtils.lerp(a.density, b.density, legEase);
    const u = SKY.material.uniforms;
    tA.setHex(a.tint); tB.setHex(b.tint);
    u.uTint.value.copy(tA).lerp(tB, legEase);
    u.uTintAmt.value = THREE.MathUtils.lerp(a.amt, b.amt, legEase);
    u.uBright.value  = THREE.MathUtils.lerp(a.bright, b.bright, legEase);
    currentRegion = (legEase < 0.5 ? a : b).name;
  }

  /* ---------- shared star sprite ---------- */
  const starCv = document.createElement('canvas');
  starCv.width = starCv.height = 128;
  const scx = starCv.getContext('2d');
  const sgrad = scx.createRadialGradient(64, 64, 0, 64, 64, 64);
  sgrad.addColorStop(0.00, 'rgba(255,255,255,1)');
  sgrad.addColorStop(0.13, 'rgba(224,236,255,.9)');
  sgrad.addColorStop(0.40, 'rgba(100,150,255,.28)');
  sgrad.addColorStop(1.00, 'rgba(59,107,240,0)');
  scx.fillStyle = sgrad;
  scx.fillRect(0, 0, 128, 128);
  const starTex = new THREE.CanvasTexture(starCv);

  const sprite = (color, scale, opacity) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: starTex, color, blending: THREE.AdditiveBlending,
      depthWrite: false, transparent: true,
      opacity: opacity === undefined ? 1 : opacity, fog: false,
    }));
    s.scale.setScalar(scale);
    return s;
  };

  /* ============================================================
     DESTINATIONS — one per stop, each a different kind of object so
     arriving somewhere feels like arriving somewhere specific.
     ============================================================ */
  const DEST_Z = -350;   // close enough to genuinely fill the frame
  const destinations = [];

  function addDestination(stopIndex, build) {
    const g = new THREE.Group();
    const s = STOPS[stopIndex].pos;
    // camera z when parked at this stop, plus the viewing distance
    const camZ = -DRIFT * (stopIndex / LEGS);
    g.position.set(s.x, s.y, camZ + DEST_Z);
    build(g);
    // remember the intended opacity of every piece, so presence can scale it
    g.traverse((o) => { if (o.material) o.userData.baseOpacity = o.material.opacity; });
    scene.add(g);
    destinations.push({ group: g, stopIndex });
    return g;
  }

  // Hero (stop 0) intentionally has no destination object — the avatar and
  // halo already anchor that section, an added star was competing with it.

  // 1 — EXPERTISE: a globular cluster
  addDestination(1, (g) => {
    const N = 5200;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3), sz = new Float32Array(N);
    const sd = new Float32Array(N), col = new Float32Array(N * 3);
    const c = new THREE.Color();
    for (let i = 0; i < N; i++) {
      // the exponent biases toward the centre, giving a real cluster's dense core
      const r = 290 * Math.pow(Math.random(), 0.42);
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph) * 0.8;
      sz[i] = 1.5 + Math.pow(Math.random(), 3) * 6.4;
      sd[i] = Math.random();
      c.setHex(Math.random() < 0.7 ? 0xffffff : 0xa8c4ff);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sz, 1));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(sd, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    const m = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
      vertexShader: STAR_VERT, fragmentShader: STAR_FRAG,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    });
    starMats.push(m);
    const pts = new THREE.Points(geo, m);
    pts.frustumCulled = false;
    g.add(pts);
    g.add(sprite(0xbcd4ff, 600, 0.56));
  });

  // 2 — CAREER: an emission nebula
  addDestination(2, (g) => {
    const cv = document.createElement('canvas');
    cv.width = cv.height = 256;
    const x = cv.getContext('2d');
    const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
    gr.addColorStop(0.00, 'rgba(190,215,255,.42)');
    gr.addColorStop(0.34, 'rgba(70,120,245,.24)');
    gr.addColorStop(1.00, 'rgba(20,40,120,0)');
    x.fillStyle = gr;
    x.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(cv);
    for (let i = 0; i < 20; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({
        map: tex, blending: THREE.AdditiveBlending, depthWrite: false,
        transparent: true, opacity: 0.26 + Math.random() * 0.26,
        color: i % 4 === 0 ? 0xffffff : 0x3b6bf0, fog: false,
      }));
      s.position.set((Math.random() - 0.5) * 760, (Math.random() - 0.5) * 500, (Math.random() - 0.5) * 340);
      s.scale.setScalar(230 + Math.random() * 330);
      g.add(s);
    }
    for (let i = 0; i < 8; i++) {
      const s = sprite(0xffffff, 30 + Math.random() * 40, 0.9);
      s.position.set((Math.random() - 0.5) * 500, (Math.random() - 0.5) * 340, 0);
      g.add(s);
    }
  });

  // 3 — PROJECTS: a constellation that draws itself in
  const constellation = { line: null, geo: null, sprites: [], count: 0 };
  addDestination(3, (g) => {
    const pattern = [
      [-1.7, 0.9, 0], [-0.6, 0.25, -0.2], [0.5, 0.6, 0.1], [1.7, -0.1, 0],
      [0.5, 0.6, 0.1], [0.25, 1.75, -0.2], [0.5, 0.6, 0.1], [0.85, -1.45, 0.15],
    ];
    const pts = pattern.map(([x, y, z]) => new THREE.Vector3(x * 150, y * 150, z * 150));
    constellation.sprites = pts.map((v) => {
      const s = sprite(0xffffff, 76, 0);
      s.position.copy(v);
      g.add(s);
      return s;
    });
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    geo.setDrawRange(0, 0);
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({
      color: 0x9dbaff, transparent: true, opacity: 0, fog: false,
    }));
    g.add(line);
    constellation.line = line;
    constellation.geo = geo;
    constellation.count = pts.length;
    // a soft field behind the figure so this stop has presence of its own
    const bg = sprite(0x2f5ee0, 880, 0.46); bg.position.set(0, 0, -60); g.add(bg);
    const bg2 = sprite(0x8fb0ff, 470, 0.36); bg2.position.set(0, 0, -40); g.add(bg2);
  });

  // 4 — CONTACT: a binary pair
  const binary = [];
  addDestination(4, (g) => {
    binary.push(sprite(0xffffff, 220), sprite(0x9dbaff, 132));
    binary.forEach((s) => g.add(s));
    g.add(sprite(0x5b86e8, 720, 0.48));
  });

  /* ---------- warp streaks, aligned to the axis of travel ---------- */
  const STREAKS = 200;
  const streaks = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.16, 0.16, 1),
    new THREE.MeshBasicMaterial({
      color: 0xdbe6ff, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
    }),
    STREAKS
  );
  const stState = Array.from({ length: STREAKS }, () => ({
    ox: (Math.random() - 0.5) * 900,
    oy: (Math.random() - 0.5) * 620,
    oz: -80 - Math.random() * 900,
  }));
  scene.add(streaks);

  scene.add(new THREE.AmbientLight(0x2b3f80, 1.4));

  /* ============================================================
     SHOOTING STARS — subtle, hero only.
     Sprites always face the camera, and material.rotation spins them in
     screen space — which is exactly what a meteor needs, and it stays
     correct because the camera itself never rotates (see the flight system
     above), so world-space direction maps predictably to screen direction.
     ============================================================ */
  const streakCv = document.createElement('canvas');
  // Tall+narrow canvas keeps the line itself crisp: a laser reads as thin
  // and hard-edged, not a soft feathered trail.
  streakCv.width = 160; streakCv.height = 8;
  const stx = streakCv.getContext('2d');
  const stg = stx.createLinearGradient(0, 0, 160, 0);
  stg.addColorStop(0.00, 'rgba(255,255,255,0)');
  stg.addColorStop(0.55, 'rgba(255,255,255,.35)');
  stg.addColorStop(0.92, 'rgba(255,255,255,.95)');
  stg.addColorStop(1.00, 'rgba(255,255,255,1)');
  stx.fillStyle = stg;
  stx.fillRect(0, 2, 160, 4);            // thin core line, not a wide band
  // a small bright point at the head, not a soft blob — keeps the laser look
  const hg = stx.createRadialGradient(155, 4, 0, 155, 4, 5);
  hg.addColorStop(0, 'rgba(255,255,255,1)');
  hg.addColorStop(1, 'rgba(255,255,255,0)');
  stx.fillStyle = hg;
  stx.fillRect(146, 0, 14, 8);
  const streakTex = new THREE.CanvasTexture(streakCv);

  const METEOR_N = 3;   // few and subtle, not a shower
  const meteors = Array.from({ length: METEOR_N }, () => {
    const mat = new THREE.SpriteMaterial({
      map: streakTex, color: 0xdfe9ff, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
    });
    const spr = new THREE.Sprite(mat);
    scene.add(spr);
    return { spr, mat, t: 0, dur: 1, delay: Math.random() * 3, active: false, ...meteorSpawnParams() };
  });

  function meteorSpawnParams() {
    // shallow diagonal streaks, the classic shooting-star angle, direction
    // varies a little so they don't all fall the same way
    const angle = -0.35 - Math.random() * 0.5;              // radians, down-right-ish
    const len = 42 + Math.random() * 34;   // longer streak, still a thin laser line
    return {
      angle,
      len,
      speed: 850 + Math.random() * 450,    // slower than before, still a quick flick
      startX: (Math.random() - 0.5) * 360,
      startY: 90 + Math.random() * 90,
      startZ: DEST_Z + 60 + (Math.random() - 0.5) * 140,
      dur: 0.24 + Math.random() * 0.14,
    };
  }

  function updateMeteors(dt, heroNear) {
    for (const m of meteors) {
      if (heroNear < 0.05) { m.mat.opacity = 0; m.active = false; continue; }
      if (!m.active) {
        m.delay -= dt;
        if (m.delay <= 0) {
          Object.assign(m, meteorSpawnParams());
          m.t = 0;
          m.active = true;
        }
        m.mat.opacity = 0;
        continue;
      }
      m.t += dt;
      const p = m.t / m.dur;
      if (p >= 1) {
        m.active = false;
        m.delay = 1.1 + Math.random() * 2.6;   // shorter gaps: appear more often
        m.mat.opacity = 0;
        continue;
      }
      const dx = Math.cos(m.angle), dy = Math.sin(m.angle);
      const dist = p * m.speed * m.dur;
      m.spr.position.set(
        STOPS[0].pos.x + m.startX + dx * dist,
        STOPS[0].pos.y + m.startY + dy * dist,
        m.startZ
      );
      m.mat.rotation = m.angle;
      // thickness is a fixed value, independent of length — otherwise a
      // longer streak would also read as a fatter one
      m.spr.scale.set(m.len, 1.5, 1);
      // near-instant fade in, a brief hold, then gone — a flick, not a glow
      const fade = p < 0.10 ? p / 0.10 : p > 0.55 ? (1 - p) / 0.45 : 1;
      m.mat.opacity = fade * 0.55 * heroNear;   // still capped low: stays subtle
    }
  }

  /* ---------- pointer: shifts the camera, never rotates it ---------- */
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', (e) => {
    ptr.tx = (e.clientX / innerWidth - 0.5) * 2;
    ptr.ty = (e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  const vel = { v: 0 };

  function size() {
    const d = Math.min(devicePixelRatio || 1, 1.75);
    const w = Math.max(1, canvas.clientWidth || innerWidth || 1);
    const h = Math.max(1, canvas.clientHeight || innerHeight || 1);
    if (canvas.width === Math.floor(w * d) && canvas.height === Math.floor(h * d)) return;
    renderer.setPixelRatio(d);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    starMats.forEach((m) => { m.uniforms.uPixelRatio.value = d; });
  }
  size();
  addEventListener('resize', size, { passive: true });

  const M = new THREE.Matrix4(), Q = new THREE.Quaternion();
  const _s = new THREE.Vector3(), _p = new THREE.Vector3();
  const _fwd = new THREE.Vector3(0, 0, 1);
  const t0 = performance.now();
  let arriving = '';
  let lastT = 0;

  function render(t) {
    const dt = Math.min(0.1, Math.max(0, t - lastT));
    lastT = t;
    const pos = flightPosition(flight.p);
    applyRegion();

    SKY.material.uniforms.uTime.value = t;
    starMats.forEach((m) => { m.uniforms.uTime.value = t; });

    /* --- camera: translation only. No lookAt, no roll, no rotation. --- */
    ptr.x += (ptr.tx - ptr.x) * 0.04;
    ptr.y += (ptr.ty - ptr.y) * 0.04;
    camera.position.set(pos.x + ptr.x * 26, pos.y - ptr.y * 17, driftZ(flight.p));
    camera.rotation.set(0, 0, 0);
    SKY.position.copy(camera.position);

    /* --- destinations fade in as you settle on them --- */
    arriving = '';
    for (const d of destinations) {
      const dist = Math.abs((currentLeg + legEase) - d.stopIndex);
      // A linear falloff left BOTH neighbours at half strength between stops,
      // which is why destinations felt half-there. A plateau + fast falloff
      // means one destination clearly owns the screen at a time.
      const near = 1 - THREE.MathUtils.smoothstep(dist, 0.18, 0.62);
      d.group.visible = near > 0.004;
      d.group.userData.near = near;
      if (d.group.visible) {
        d.group.traverse((o) => {
          if (o.material && o.userData.baseOpacity !== undefined) {
            o.material.opacity = o.userData.baseOpacity * near;
          }
        });
      }
      if (near > 0.6) arriving = REGIONS[d.stopIndex].name;
    }

    // Hero (stop 0) has no destination object, but meteors still need to
    // know how close we are to it — same presence curve as everything else.
    const heroDist = Math.abs(currentLeg + legEase - 0);
    const heroNear = 1 - THREE.MathUtils.smoothstep(heroDist, 0.18, 0.62);
    updateMeteors(dt, heroNear);

    // the constellation draws itself in as you settle on stop 3.
    // Look up by stopIndex, not array position — the array no longer has
    // one entry per stop now that the hero (stop 0) has none, so a raw
    // index would silently point at the wrong destination.
    {
      const near = (destinations.find((d) => d.stopIndex === 3)?.group.userData.near) || 0;
      const segs = Math.max(0, Math.min(constellation.count, Math.ceil(near * constellation.count)));
      constellation.geo.setDrawRange(0, segs);
      constellation.line.material.opacity = near * 1.0;
      constellation.sprites.forEach((s, i) => {
        s.material.opacity = THREE.MathUtils.clamp(near * constellation.count - i, 0, 1);
        s.scale.setScalar(76 + Math.sin(t * 1.3 + i) * 8);
      });
    }

    // binary pair orbits its barycentre
    if (binary.length === 2) {
      const a = t * 0.32;
      binary[0].position.set(Math.cos(a) * 62, Math.sin(a) * 62, 0);
      binary[1].position.set(-Math.cos(a) * 104, -Math.sin(a) * 104, 0);
      binary[0].scale.setScalar(220 + Math.sin(t * 0.9) * 14);
      binary[1].scale.setScalar(132 + Math.cos(t * 1.1) * 9);
    }

    /* --- streaks stretch along whichever axis we're travelling --- */
    const sv = Math.min(1, vel.v);
    streaks.material.opacity = sv * 0.55;
    if (sv > 0.01) {
      Q.setFromUnitVectors(_fwd, _moveDir);
      for (let i = 0; i < STREAKS; i++) {
        const s2 = stState[i];
        _p.set(camera.position.x + s2.ox, camera.position.y + s2.oy, camera.position.z + s2.oz);
        _s.set(1, 1, 10 + sv * 150);
        M.compose(_p, Q, _s);
        streaks.setMatrixAt(i, M);
      }
      streaks.instanceMatrix.needsUpdate = true;
    }

    vel.v *= 0.9;
    renderer.render(scene, camera);
  }

  window.__cosmosRender = () => { size(); render((performance.now() - t0) / 1000); };
  window.__cosmosFlight = flight;
  window.__cosmosInfo = () => ({
    region: currentRegion,
    arriving,
    leg: currentLeg,
    move: STOPS[currentLeg + 1] ? STOPS[currentLeg + 1].move : 'end',
    pos: camera.position.toArray().map((n) => +n.toFixed(1)),
    driftZ: +driftZ(flight.p).toFixed(1),
    rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z].map((n) => +n.toFixed(4)),
  });
  window.__cosmosMeteors = () => meteors.map((m) => ({
    active: m.active, opacity: +m.mat.opacity.toFixed(3), t: +m.t.toFixed(2), dur: +m.dur.toFixed(2),
    len: +m.len.toFixed(1), scale: m.spr.scale.toArray().map((n) => +n.toFixed(2)),
  }));
  // Test seam: force every meteor to fire immediately, skipping their random
  // delay, so verification doesn't have to wait out real gaps between streaks.
  window.__cosmosForceMeteors = () => meteors.forEach((m) => { m.delay = 0; });

  if (reduce) {
    flight.p = 0;
    render(6);
    addEventListener('resize', () => render(6), { passive: true });
  } else {
    renderer.setAnimationLoop(() => render((performance.now() - t0) / 1000));
    gsap.to(flight, {
      p: 1, ease: 'none',
      // a higher scrub makes the camera lag the scroll, which reads as slower
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.8 },
    });
    ScrollTrigger.create({
      onUpdate: (self) => { vel.v = Math.min(1.5, Math.abs(self.getVelocity()) / 3400); },
    });
  }

}

/* ============================================================
   Section reveals
   ============================================================ */
if (!reduce) {
  document.querySelectorAll('section').forEach((sec) => {
    const els = sec.querySelectorAll('.eyebrow, .section-title, .role, .school, .scroll-hint, .socials, .portrait-stage, .name, .skill-card, .tl-item, .proj, .lede, .email-button');
    if (!els.length) return;
    gsap.from(els, {
      y: 34, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out',
      scrollTrigger: { trigger: sec, start: 'top 78%', toggleActions: 'play none none reverse' },
    });
  });
}

if (systemReduce || lowPower || _mq) {
  const btn = document.createElement('button');
  btn.id = 'motion-btn';
  btn.type = 'button';
  btn.textContent = reduce ? '▶  Enable full motion' : '⏸  Reduce motion';
  btn.title = lowPower && reduce ? 'Full motion may be slow on this device (no GPU acceleration detected)' : '';
  btn.addEventListener('click', () => { location.search = reduce ? '?motion=full' : '?motion=reduced'; });
  document.body.appendChild(btn);
}

/* ---------- hero orbit: draw itself in, then drift ---------- */
if (!reduce) {
  const orbits = [...document.querySelectorAll('.orbit path')];
  orbits.forEach((path, i) => {
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.6,
      delay: 0.45 + i * 0.22,
      ease: 'power2.inOut',
    });
  });
  // the whole orbit tilts gently, so it reads as a real ring in 3D
  gsap.to('.orbit', {
    rotate: '+=6',
    duration: 9,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
    transformOrigin: '50% 50%',
  });
}

window.__st = ScrollTrigger;
window.__gsap = gsap;

addEventListener('load', () => ScrollTrigger.refresh());
