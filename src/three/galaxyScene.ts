// Galaxy scroll-flight: a from-scratch shader sky, four star field layers, a
// scroll-driven camera flight between fixed per-section "destinations"
// (globular cluster, nebula, constellation, binary), warp streaks, and a few
// subtle hero-only shooting stars. Ported from the standalone prototype at
// prototypes/10-cosmos.entry.js (see prototypes/README.md).
//
// The camera never rotates — it always faces -Z, and travel between stops is
// a straight translation along exactly one world axis at a time. `setFlight`
// is driven externally (GalaxyHero wires it to a GSAP ScrollTrigger scrubbing
// the whole document), not by an internal clock.
import * as THREE from "three";

function isSoftwareRenderer(gl: WebGLRenderingContext | null): boolean {
  if (!gl) return false;
  const dbg = gl.getExtension("WEBGL_debug_renderer_info");
  const name =
    (dbg
      ? (gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) as string)
      : (gl.getParameter(gl.RENDERER) as string)) || "";
  return /swiftshader|llvmpipe|software|basic render|microsoft basic/i.test(name);
}

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
  float starLayer(vec3 d, float scale, float thresh, float seedOff){
    vec3 cell = floor(d * scale);
    float h = hash(cell + seedOff);
    float on = smoothstep(thresh, thresh + 0.0011, h);
    float b  = pow(hash(cell + seedOff + 41.0), 3.2);
    return on * (0.22 + b * 2.4);
  }
`;

const STAR_VERT = /* glsl */ `
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

const STAR_FRAG = /* glsl */ `
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

interface Meteor {
  sprite: THREE.Sprite;
  mat: THREE.SpriteMaterial;
  t: number;
  dur: number;
  delay: number;
  active: boolean;
  angle: number;
  len: number;
  speed: number;
  startX: number;
  startY: number;
}

function meteorSpawnParams() {
  // right-and-down diagonal: cos positive (right), sin negative (down)
  const angle = -0.35 - Math.random() * 0.5;
  const len = 70 + Math.random() * 70;
  return {
    angle,
    len,
    speed: 850 + Math.random() * 450,
    startX: (Math.random() - 0.5) * 900,
    startY: (Math.random() - 0.5) * 700,
    dur: 0.24 + Math.random() * 0.14,
  };
}

export interface GalaxyScene {
  render: (tSeconds: number) => void;
  resize: () => void;
  setPointer: (x: number, y: number) => void;
  setFlight: (p: number) => void;
  setVelocity: (pxPerSec: number) => void;
  onRegionChange: (cb: (name: string) => void) => void;
  dispose: () => void;
  isSoftware: boolean;
}

export function createGalaxyScene(canvas: HTMLCanvasElement): GalaxyScene | null {
  let renderer: THREE.WebGLRenderer | null = null;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    renderer = null;
  }
  if (!renderer) return null;

  const isSoftware = isSoftwareRenderer(renderer.getContext());

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(62, 2, 0.5, 8000);

  const SKY = new THREE.Mesh(
    new THREE.SphereGeometry(3400, 200, 130),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        uTime: { value: 0 },
        uTint: { value: new THREE.Color(0x1a3070) },
        uTintAmt: { value: 0.26 },
        uBright: { value: 1 },
      },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader:
        "precision highp float;\n" +
        NOISE +
        /* glsl */ `
        varying vec3 vDir;
        uniform float uTime, uTintAmt, uBright;
        uniform vec3  uTint;

        void main() {
          vec3 d = normalize(vDir);

          vec3 axis    = normalize(vec3(0.32, 1.0, 0.14));
          vec3 coreDir = normalize(vec3(-0.70, -0.10, 0.70));
          float lat    = dot(d, axis);
          float toCore = max(0.0, dot(d, coreDir));

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

          float o1 = lat + (c1 - 0.5) * 0.085;
          float o2 = lat + (c2 - 0.5) * 0.125 - 0.014;
          float o3 = lat + (c3 - 0.5) * 0.050 + 0.022;
          float dust = clamp(exp(-o1 * o1 *  820.0) * 0.90
                           + exp(-o2 * o2 * 2400.0) * 0.70
                           + exp(-o3 * o3 * 5200.0) * 0.50, 0.0, 1.0);
          dust *= 0.26 + 0.74 * ridged(d * 9.0, 5);
          dust *= 0.38 + 0.62 * toCore;

          vec3 deep  = vec3(0.004, 0.008, 0.026);
          vec3 royal = vec3(0.085, 0.150, 0.460);
          vec3 pale  = vec3(0.820, 0.880, 1.000);
          vec3 white = vec3(1.0);

          vec3 col = deep;
          col = mix(col, royal, clamp((band - 0.20) * 1.25, 0.0, 1.0));
          col = mix(col, pale,  clamp(band * band * 0.75, 0.0, 1.0));
          col += white * pow(toCore, 12.0) * exp(-lat * lat * 44.0) * 0.70;
          col *= 1.0 - dust * 0.88;

          float stars = 0.0;
          stars += starLayer(d,   760.0, 0.99720 - bandN * 0.0030,  0.0) * 1.00;
          stars += starLayer(d,  1500.0, 0.99620 - bandN * 0.0055,  7.0) * 0.80;
          stars += starLayer(d,  2900.0, 0.99500 - bandN * 0.0080, 13.0) * 0.58;
          stars += starLayer(d,  5200.0, 0.99420 - bandN * 0.0105, 23.0) * 0.40;
          stars += starLayer(d,  7000.0, 0.99360 - bandN * 0.0125, 37.0) * 0.26;
          stars += starLayer(d,  9500.0, 0.99320 - bandN * 0.0140, 61.0) * 0.16;

          stars *= 1.0 - dust * 0.62;

          float tw = 0.78 + 0.22 * sin(uTime * 1.8 + hash(floor(d * 760.0)) * 90.0);
          col += mix(pale, white, 0.62) * stars * (0.50 + bandN * 0.30) * tw;

          col *= 0.86 + c3 * 0.34;

          float lum = dot(col, vec3(0.299, 0.587, 0.114));
          col = mix(col, uTint * lum * 2.4, uTintAmt * clamp(bandN * 1.7, 0.0, 1.0));
          col *= uBright;

          float gray = dot(col, vec3(0.299, 0.587, 0.114));
          col = mix(vec3(gray), col, clamp(bandN * 2.4 + toCore * 0.7 + stars * 0.4, 0.0, 1.0));

          gl_FragColor = vec4(col, 1.0);
        }`,
    })
  );
  SKY.frustumCulled = false;
  scene.add(SKY);

  const starMats: THREE.ShaderMaterial[] = [];
  function starField(count: number, spread: number, depth: number, sizeMin: number, sizeMax: number) {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const seed = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.7;
      pos[i * 3 + 2] = 300 - Math.random() * depth;
      size[i] = sizeMin + Math.pow(Math.random(), 2.8) * (sizeMax - sizeMin);
      seed[i] = Math.random();
      const t = Math.random();
      if (t < 0.58) c.setHex(0xffffff);
      else if (t < 0.87) c.setHex(0xc8d8ff);
      else c.setHex(0x6f95ff);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    const m = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
      vertexShader: STAR_VERT,
      fragmentShader: STAR_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    });
    const pts = new THREE.Points(g, m);
    pts.frustumCulled = false;
    scene.add(pts);
    starMats.push(m);
  }
  starField(14000, 1000, 3000, 0.6, 2.2);
  starField(7500, 1500, 3200, 1.1, 3.6);
  starField(3400, 2200, 3400, 1.8, 5.6);
  starField(1400, 3000, 3600, 2.6, 8.5);

  /* ============================================================
     FLIGHT — pure cardinal moves between fixed destinations.
     The camera NEVER rotates: it always faces -Z, and travel is a straight
     translation along exactly one world axis per section.
     ============================================================ */
  const STEP_W = 190;
  const STEP_H = 135;
  const DRIFT = 1150;
  const driftZ = (p: number) => -DRIFT * THREE.MathUtils.clamp(p, 0, 1);

  const STOPS = [
    { key: "HERO", pos: new THREE.Vector3(0, 0, 0) },
    { key: "EXPERTISE", pos: new THREE.Vector3(2 * STEP_W, 0, 0) },
    { key: "CAREER", pos: new THREE.Vector3(2 * STEP_W, -STEP_H, 0) },
    { key: "PROJECTS", pos: new THREE.Vector3(STEP_W, -STEP_H, 0) },
    { key: "CONTACT", pos: new THREE.Vector3(STEP_W, STEP_H, 0) },
  ];
  const LEGS = STOPS.length - 1;

  const sstep = (a: number, b: number, x: number) => {
    const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  const _camTarget = new THREE.Vector3();
  const _moveDir = new THREE.Vector3(0, 0, -1);
  let currentLeg = 0;
  let legEase = 0;

  function flightPosition(p: number) {
    const f = THREE.MathUtils.clamp(p, 0, 1) * LEGS;
    const i = Math.min(LEGS - 1, Math.floor(f));
    const local = f - i;
    const e = sstep(0.1, 0.94, local);
    currentLeg = i;
    legEase = e;
    _camTarget.copy(STOPS[i].pos).lerp(STOPS[i + 1].pos, e);
    _moveDir.copy(STOPS[i + 1].pos).sub(STOPS[i].pos).normalize();
    return _camTarget;
  }

  scene.fog = new THREE.FogExp2(0x03050d, 0.0006);
  const REGIONS = [
    { fog: 0x030509, density: 0.0005, tint: 0x070c1e, amt: 0.08, bright: 0.96, name: "GALACTIC CORE" },
    { fog: 0x0d1938, density: 0.0009, tint: 0x1a3070, amt: 0.26, bright: 1.02, name: "STAR CLUSTER" },
    { fog: 0x101f4a, density: 0.0012, tint: 0x24408f, amt: 0.3, bright: 0.98, name: "NEBULA" },
    { fog: 0x020308, density: 0.0004, tint: 0x040814, amt: 0.16, bright: 0.78, name: "DEEP FIELD" },
    { fog: 0x0d1938, density: 0.0008, tint: 0x27417f, amt: 0.2, bright: 0.96, name: "BINARY SYSTEM" },
  ];
  const cA = new THREE.Color();
  const cB = new THREE.Color();
  const tA = new THREE.Color();
  const tB = new THREE.Color();
  let lastRegionName = "";
  let onRegionChange: ((name: string) => void) | null = null;

  function applyRegion() {
    const a = REGIONS[currentLeg];
    const b = REGIONS[Math.min(REGIONS.length - 1, currentLeg + 1)];
    cA.setHex(a.fog);
    cB.setHex(b.fog);
    (scene.fog as THREE.FogExp2).color.copy(cA).lerp(cB, legEase);
    (scene.fog as THREE.FogExp2).density = THREE.MathUtils.lerp(a.density, b.density, legEase);
    const u = (SKY.material as THREE.ShaderMaterial).uniforms;
    tA.setHex(a.tint);
    tB.setHex(b.tint);
    u.uTint.value.copy(tA).lerp(tB, legEase);
    u.uTintAmt.value = THREE.MathUtils.lerp(a.amt, b.amt, legEase);
    u.uBright.value = THREE.MathUtils.lerp(a.bright, b.bright, legEase);

    const name = (legEase < 0.5 ? a : b).name;
    if (name !== lastRegionName) {
      lastRegionName = name;
      onRegionChange?.(name);
    }
  }

  const starCv = document.createElement("canvas");
  starCv.width = starCv.height = 128;
  const scx = starCv.getContext("2d")!;
  const sgrad = scx.createRadialGradient(64, 64, 0, 64, 64, 64);
  sgrad.addColorStop(0.0, "rgba(255,255,255,1)");
  sgrad.addColorStop(0.13, "rgba(224,236,255,.9)");
  sgrad.addColorStop(0.4, "rgba(100,150,255,.28)");
  sgrad.addColorStop(1.0, "rgba(59,107,240,0)");
  scx.fillStyle = sgrad;
  scx.fillRect(0, 0, 128, 128);
  const starTex = new THREE.CanvasTexture(starCv);

  const sprite = (color: number, scale: number, opacity?: number) => {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: starTex,
        color,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: opacity === undefined ? 1 : opacity,
        fog: false,
      })
    );
    s.scale.setScalar(scale);
    return s;
  };

  /* ============================================================
     DESTINATIONS — one per stop, each a different kind of object.
     ============================================================ */
  const DEST_Z = -350;
  const destinations: { group: THREE.Group; stopIndex: number; near: number }[] = [];

  function addDestination(stopIndex: number, build: (g: THREE.Group) => void) {
    const g = new THREE.Group();
    const s = STOPS[stopIndex].pos;
    const camZ = -DRIFT * (stopIndex / LEGS);
    g.position.set(s.x, s.y, camZ + DEST_Z);
    build(g);
    g.traverse((o) => {
      const mat = (o as THREE.Sprite | THREE.Points | THREE.Line).material as
        | THREE.Material
        | THREE.Material[]
        | undefined;
      if (mat && !Array.isArray(mat) && "opacity" in mat) {
        o.userData.baseOpacity = (mat as THREE.Material & { opacity: number }).opacity;
      }
    });
    scene.add(g);
    destinations.push({ group: g, stopIndex, near: 0 });
    return g;
  }

  // 1 — EXPERTISE: a globular cluster
  addDestination(1, (g) => {
    const N = 5200;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    const sz = new Float32Array(N);
    const sd = new Float32Array(N);
    const col = new Float32Array(N * 3);
    const c = new THREE.Color();
    for (let i = 0; i < N; i++) {
      const r = 290 * Math.pow(Math.random(), 0.42);
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph) * 0.8;
      sz[i] = 1.5 + Math.pow(Math.random(), 3) * 6.4;
      sd[i] = Math.random();
      c.setHex(Math.random() < 0.7 ? 0xffffff : 0xa8c4ff);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(sd, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    const m = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
      vertexShader: STAR_VERT,
      fragmentShader: STAR_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    });
    starMats.push(m);
    const pts = new THREE.Points(geo, m);
    pts.frustumCulled = false;
    g.add(pts);
    g.add(sprite(0xbcd4ff, 600, 0.56));
  });

  // 2 — CAREER: an emission nebula
  addDestination(2, (g) => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 256;
    const x = cv.getContext("2d")!;
    const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
    gr.addColorStop(0.0, "rgba(190,215,255,.42)");
    gr.addColorStop(0.34, "rgba(70,120,245,.24)");
    gr.addColorStop(1.0, "rgba(20,40,120,0)");
    x.fillStyle = gr;
    x.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(cv);
    for (let i = 0; i < 20; i++) {
      const s = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: tex,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          transparent: true,
          opacity: 0.26 + Math.random() * 0.26,
          color: i % 4 === 0 ? 0xffffff : 0x3b6bf0,
          fog: false,
        })
      );
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
  const constellation: { line: THREE.Line | null; geo: THREE.BufferGeometry | null; sprites: THREE.Sprite[]; count: number } = {
    line: null,
    geo: null,
    sprites: [],
    count: 0,
  };
  addDestination(3, (g) => {
    const pattern: [number, number, number][] = [
      [-1.7, 0.9, 0],
      [-0.6, 0.25, -0.2],
      [0.5, 0.6, 0.1],
      [1.7, -0.1, 0],
      [0.5, 0.6, 0.1],
      [0.25, 1.75, -0.2],
      [0.5, 0.6, 0.1],
      [0.85, -1.45, 0.15],
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
    const line = new THREE.Line(
      geo,
      new THREE.LineBasicMaterial({ color: 0x9dbaff, transparent: true, opacity: 0, fog: false })
    );
    g.add(line);
    constellation.line = line;
    constellation.geo = geo;
    constellation.count = pts.length;
    const bg = sprite(0x2f5ee0, 880, 0.46);
    bg.position.set(0, 0, -60);
    g.add(bg);
    const bg2 = sprite(0x8fb0ff, 470, 0.36);
    bg2.position.set(0, 0, -40);
    g.add(bg2);
  });

  // 4 — CONTACT: a binary pair
  const binary: THREE.Sprite[] = [];
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
      color: 0xdbe6ff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
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

  /* ---------- shooting stars: subtle, hero only ---------- */
  const streakCv = document.createElement("canvas");
  streakCv.width = 160;
  streakCv.height = 8;
  const stx = streakCv.getContext("2d")!;
  const stg = stx.createLinearGradient(0, 0, 160, 0);
  stg.addColorStop(0.0, "rgba(255,255,255,0)");
  stg.addColorStop(0.55, "rgba(255,255,255,.35)");
  stg.addColorStop(0.92, "rgba(255,255,255,.95)");
  stg.addColorStop(1.0, "rgba(255,255,255,1)");
  stx.fillStyle = stg;
  stx.fillRect(0, 2, 160, 4);
  const hg = stx.createRadialGradient(155, 4, 0, 155, 4, 5);
  hg.addColorStop(0, "rgba(255,255,255,1)");
  hg.addColorStop(1, "rgba(255,255,255,0)");
  stx.fillStyle = hg;
  stx.fillRect(146, 0, 14, 8);
  const streakTex = new THREE.CanvasTexture(streakCv);

  const METEOR_N = 3;
  const meteors: Meteor[] = Array.from({ length: METEOR_N }, () => {
    const mat = new THREE.SpriteMaterial({
      map: streakTex,
      color: 0xdfe9ff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const spr = new THREE.Sprite(mat);
    scene.add(spr);
    return {
      sprite: spr,
      mat,
      t: 0,
      delay: Math.random() * 3,
      active: false,
      ...meteorSpawnParams(),
    };
  });

  function updateMeteors(dt: number, heroNear: number) {
    for (const m of meteors) {
      if (heroNear < 0.05) {
        m.mat.opacity = 0;
        m.active = false;
        continue;
      }
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
        m.delay = 1.1 + Math.random() * 2.6;
        m.mat.opacity = 0;
        continue;
      }
      const dx = Math.cos(m.angle);
      const dy = Math.sin(m.angle);
      const dist = p * m.speed * m.dur;
      m.sprite.position.set(STOPS[0].pos.x + m.startX + dx * dist, STOPS[0].pos.y + m.startY + dy * dist, DEST_Z + 60);
      m.mat.rotation = m.angle;
      m.sprite.scale.set(m.len, 2.6, 1);
      const fade = p < 0.1 ? p / 0.1 : p > 0.55 ? (1 - p) / 0.45 : 1;
      m.mat.opacity = fade * 0.6 * heroNear;
    }
  }

  /* ---------- pointer parallax (translation only, camera never rotates) ---------- */
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  const vel = { v: 0 };
  const flight = { p: 0 };

  function size() {
    const d = Math.min(window.devicePixelRatio || 1, 1.75);
    const w = Math.max(1, canvas.clientWidth || window.innerWidth || 1);
    const h = Math.max(1, canvas.clientHeight || window.innerHeight || 1);
    if (canvas.width === Math.floor(w * d) && canvas.height === Math.floor(h * d)) return;
    renderer!.setPixelRatio(d);
    renderer!.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    starMats.forEach((m) => {
      m.uniforms.uPixelRatio.value = d;
    });
  }
  size();

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const _s = new THREE.Vector3();
  const _p = new THREE.Vector3();
  const _fwd = new THREE.Vector3(0, 0, 1);

  function render(t: number, dt: number) {
    const pos = flightPosition(flight.p);
    applyRegion();

    SKY.material.uniforms.uTime.value = t;
    starMats.forEach((m) => {
      m.uniforms.uTime.value = t;
    });

    ptr.x += (ptr.tx - ptr.x) * 0.04;
    ptr.y += (ptr.ty - ptr.y) * 0.04;
    camera.position.set(pos.x + ptr.x * 26, pos.y - ptr.y * 17, driftZ(flight.p));
    camera.rotation.set(0, 0, 0);
    SKY.position.copy(camera.position);

    for (const d of destinations) {
      const dist = Math.abs(currentLeg + legEase - d.stopIndex);
      const near = 1 - THREE.MathUtils.smoothstep(dist, 0.18, 0.62);
      d.group.visible = near > 0.004;
      d.near = near;
      if (d.group.visible) {
        d.group.traverse((o) => {
          const mat = (o as THREE.Sprite | THREE.Points | THREE.Line).material as
            | (THREE.Material & { opacity: number })
            | undefined;
          if (mat && o.userData.baseOpacity !== undefined) {
            mat.opacity = o.userData.baseOpacity * near;
          }
        });
      }
    }

    const heroDist = Math.abs(currentLeg + legEase - 0);
    const heroNear = 1 - THREE.MathUtils.smoothstep(heroDist, 0.18, 0.62);
    updateMeteors(dt, heroNear);

    if (constellation.geo && constellation.line) {
      const near = destinations.find((d) => d.stopIndex === 3)?.near || 0;
      const segs = Math.max(0, Math.min(constellation.count, Math.ceil(near * constellation.count)));
      constellation.geo.setDrawRange(0, segs);
      (constellation.line.material as THREE.Material & { opacity: number }).opacity = near;
      constellation.sprites.forEach((s, i) => {
        (s.material as THREE.Material & { opacity: number }).opacity = THREE.MathUtils.clamp(
          near * constellation.count - i,
          0,
          1
        );
        s.scale.setScalar(76 + Math.sin(t * 1.3 + i) * 8);
      });
    }

    if (binary.length === 2) {
      const a = t * 0.32;
      binary[0].position.set(Math.cos(a) * 62, Math.sin(a) * 62, 0);
      binary[1].position.set(-Math.cos(a) * 104, -Math.sin(a) * 104, 0);
      binary[0].scale.setScalar(220 + Math.sin(t * 0.9) * 14);
      binary[1].scale.setScalar(132 + Math.cos(t * 1.1) * 9);
    }

    const sv = Math.min(1, vel.v);
    (streaks.material as THREE.Material & { opacity: number }).opacity = sv * 0.55;
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

    renderer!.render(scene, camera);
  }

  let lastT = 0;

  return {
    render(t: number) {
      const dt = Math.min(0.1, Math.max(0, t - lastT));
      lastT = t;
      render(t, dt);
    },
    resize: size,
    setPointer(x: number, y: number) {
      ptr.tx = x;
      ptr.ty = y;
    },
    setFlight(p: number) {
      flight.p = p;
    },
    setVelocity(pxPerSec: number) {
      vel.v = Math.min(1.5, Math.abs(pxPerSec) / 3400);
    },
    onRegionChange(cb: (name: string) => void) {
      onRegionChange = cb;
    },
    dispose() {
      SKY.geometry.dispose();
      (SKY.material as THREE.Material).dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Points || obj instanceof THREE.Line) obj.geometry.dispose();
        if (obj instanceof THREE.Points || obj instanceof THREE.Sprite || obj instanceof THREE.Line) {
          const mat = obj.material as THREE.Material | THREE.Material[];
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose?.();
        }
      });
      streaks.geometry.dispose();
      (streaks.material as THREE.Material).dispose();
      streakTex.dispose();
      starTex.dispose();
      renderer!.dispose();
    },
    isSoftware,
  };
}
