import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createGalaxyScene } from "../three/galaxyScene";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function GalaxyHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = createGalaxyScene(canvas);
    if (!scene) return; // WebGL unavailable — CSS fallback background shows through

    let raf = 0;
    const t0 = performance.now();
    const tick = () => {
      scene.render((performance.now() - t0) / 1000);
      raf = requestAnimationFrame(tick);
    };

    // The camera flies between fixed per-section "destinations" as the whole
    // document scrolls, exactly like prototypes/10-cosmos.entry.js. Reduced
    // motion / a software renderer skips the flight and the animation loop
    // entirely — one static frame parked at the hero, same as the prototype.
    let flightTween: gsap.core.Tween | null = null;
    let velocityTrigger: ScrollTrigger | null = null;

    if (reducedMotion || scene.isSoftware) {
      scene.render(6);
    } else {
      const flight = { p: 0 };
      flightTween = gsap.to(flight, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.8,
        },
        onUpdate: () => scene.setFlight(flight.p),
      });
      velocityTrigger = ScrollTrigger.create({
        onUpdate: (self) => scene.setVelocity(self.getVelocity()),
      });
      scene.onRegionChange((name) => {
        window.dispatchEvent(new CustomEvent("cosmos:region", { detail: name }));
      });
      raf = requestAnimationFrame(tick);
    }

    // clientWidth/clientHeight aren't reliably settled the instant this effect
    // runs, so a one-time resize() call here can size the drawing buffer to a
    // stale (or 0x0) box. A ResizeObserver fires immediately with the current
    // box on subscribe and again on any later layout change (font load, flex
    // reflow, container resize) — not just window resize.
    const ro = new ResizeObserver(() => {
      scene.resize();
      ScrollTrigger.refresh();
    });
    ro.observe(canvas);

    const onPointerMove = (e: PointerEvent) => {
      scene.setPointer((e.clientX / window.innerWidth - 0.5) * 2, (e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      flightTween?.scrollTrigger?.kill();
      flightTween?.kill();
      velocityTrigger?.kill();
      scene.dispose();
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="galaxy-hero-canvas" aria-hidden="true" />;
}

export default GalaxyHero;
