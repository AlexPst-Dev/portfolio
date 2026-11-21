"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Sampling grid per side; ~200 gives about 30k particles */
  grid?: number;
  reduceMotion?: boolean;
};

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform float uMouseForce;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute vec3 aTarget;
  attribute vec3 aScatter;
  attribute float aLum;
  attribute float aSeed;
  varying float vLum;
  varying float vHeat;

  float easeOutExpo(float x) { return x >= 1.0 ? 1.0 : 1.0 - pow(2.0, -10.0 * x); }

  void main() {
    // Bright points arrive first, so the face appears from its light
    float delay = (1.0 - aLum) * 0.35 + aSeed * 0.2;
    float t = easeOutExpo(clamp((uProgress - delay) / 0.6, 0.0, 1.0));
    vec3 pos = mix(aScatter, aTarget, t);

    // Idle breathing
    pos.z += sin(uTime * 1.3 + aSeed * 40.0) * 0.012;
    pos.xy += vec2(sin(uTime * 0.7 + aSeed * 20.0), cos(uTime * 0.9 + aSeed * 31.0)) * 0.0025;

    // Cursor pushes points away, hardest at the centre
    vec2 d = pos.xy - uMouse;
    float dist = length(d);
    float f = smoothstep(0.32, 0.0, dist) * uMouseForce;
    pos.xy += normalize(d + 1e-5) * f * 0.16;
    pos.z += f * 0.35;
    vHeat = f;

    vLum = aLum;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.55 + aLum * 0.95 + f * 0.8) * uPixelRatio;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uFlame;
  uniform vec3 uBone;
  varying float vLum;
  varying float vHeat;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float edge = smoothstep(0.5, 0.32, r);
    vec3 col = vLum < 0.45
      ? mix(uDeep, uFlame, smoothstep(0.05, 0.45, vLum))
      : mix(uFlame, uBone, smoothstep(0.45, 0.85, vLum));
    col = mix(col, uBone, vHeat * 0.6);
    gl_FragColor = vec4(col, edge * (0.55 + vLum * 0.45));
  }
`;

/**
 * The portrait as a field of particles sampled from the photo's luminance.
 * Points assemble on load and part around the cursor. Without WebGL, or
 * under reduced motion, the photograph itself is shown.
 */
export default function ParticlePortrait({ src, alt, className, grid = 200, reduceMotion = false }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const fallback = reduceMotion || failed;

  useEffect(() => {
    if (reduceMotion) return;
    const el = host.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      // No WebGL: show the photograph instead (deferred to stay out of the effect body)
      queueMicrotask(() => setFailed(true));
      return;
    }
    const dpr = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    // Out of flow, so the canvas never props its grid track open
    Object.assign(renderer.domElement.style, { position: "absolute", inset: "0", width: "100%", height: "100%", display: "block" });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);

    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uMouse: { value: new THREE.Vector2(9, 9) },
        uMouseForce: { value: 0 },
        uSize: { value: 2.6 },
        uPixelRatio: { value: dpr },
        uDeep: { value: new THREE.Color("#5a2200") },
        uFlame: { value: new THREE.Color("#ff6a13") },
        uBone: { value: new THREE.Color("#f5efe8") },
      },
    });

    let points: THREE.Points | undefined;
    let disposed = false;
    const img = new window.Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      if (disposed) return;
      const c = document.createElement("canvas");
      c.width = grid;
      c.height = grid;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      if (!ctx) return setFailed(true);
      ctx.drawImage(img, 0, 0, grid, grid);
      const { data } = ctx.getImageData(0, 0, grid, grid);
      const target: number[] = [];
      const scatter: number[] = [];
      const lum: number[] = [];
      const seed: number[] = [];
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const i = (y * grid + x) * 4;
          const a = data[i + 3] / 255;
          const l = ((0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255) * a;
          if (l < 0.045) continue;
          const jx = (Math.random() - 0.5) / grid;
          const jy = (Math.random() - 0.5) / grid;
          const px = (x / grid - 0.5) * 1.9 + jx;
          const py = -(y / grid - 0.5) * 1.9 + jy;
          target.push(px, py, l * 0.4);
          const ang = Math.random() * Math.PI * 2;
          const rad = 1.2 + Math.random() * 1.6;
          scatter.push(Math.cos(ang) * rad, Math.sin(ang) * rad, (Math.random() - 0.5) * 2);
          lum.push(Math.min(1, l * 1.35));
          seed.push(Math.random());
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(target, 3));
      geo.setAttribute("aTarget", new THREE.Float32BufferAttribute(target, 3));
      geo.setAttribute("aScatter", new THREE.Float32BufferAttribute(scatter, 3));
      geo.setAttribute("aLum", new THREE.Float32BufferAttribute(lum, 1));
      geo.setAttribute("aSeed", new THREE.Float32BufferAttribute(seed, 1));
      points = new THREE.Points(geo, material);
      scene.add(points);
      start = performance.now();
    };
    img.onerror = () => setFailed(true);

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      const aspect = w / Math.max(1, h);
      if (aspect >= 1) {
        camera.left = -aspect;
        camera.right = aspect;
        camera.top = 1;
        camera.bottom = -1;
      } else {
        camera.left = -1;
        camera.right = 1;
        camera.top = 1 / aspect;
        camera.bottom = -1 / aspect;
      }
      camera.updateProjectionMatrix();
      material.uniforms.uSize.value = Math.max(1.6, Math.min(w, h) / 230);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    let targetForce = 0;
    const mouse = new THREE.Vector2(9, 9);
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      const inside = nx > -0.1 && nx < 1.1 && ny > -0.1 && ny < 1.1;
      targetForce = inside ? 1 : 0;
      mouse.set(
        camera.left + nx * (camera.right - camera.left),
        camera.top - ny * (camera.top - camera.bottom),
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Only draw while visible
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    let start = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || !points) return;
      const u = material.uniforms;
      u.uTime.value = now / 1000;
      u.uProgress.value = Math.min(1.2, (now - start) / 2200);
      u.uMouseForce.value += (targetForce - u.uMouseForce.value) * 0.08;
      (u.uMouse.value as THREE.Vector2).lerp(mouse, 0.15);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      points?.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [src, grid, reduceMotion]);

  return (
    <div ref={host} className={className} role="img" aria-label={alt}>
      {fallback && (
        <Image src={src} alt="" fill sizes="50vw" className="object-contain [filter:grayscale(1)_sepia(1)_saturate(4)_hue-rotate(-12deg)_brightness(.85)]" />
      )}
    </div>
  );
}
