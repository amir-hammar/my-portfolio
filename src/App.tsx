import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  Main,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
} from "./components";
import Timeline from "./components/Timeline/Timeline";
import GalaxyHero from "./components/GalaxyHero";
import MissionHud from "./components/MissionHud";
import { useReducedMotion } from "./hooks/useReducedMotion";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import "./i18n";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const REVEAL_SECTION_IDS = ["expertise", "history", "projects", "contact"];

function App() {
  const reducedMotion = useReducedMotion();

  // A URL like /#coeurSolidaire (shared on LinkedIn, say) should land right
  // on that project, not at the top — so the reset-to-top effect below
  // stands down whenever the URL arrived with a target already in it.
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Jumps to whatever the hash names — a project id, or one of the four main
  // sections — using the same eased scroll the nav itself uses, rather than
  // the browser's own instant anchor jump. Fired twice: once shortly after
  // mount, and once again a bit later to correct for layout that's still
  // settling then (lazy-loaded project images above the target changing the
  // page's height as they load in).
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const scrollToHash = () => {
      const el = document.getElementById(hash);
      if (!el) return;

      if (reducedMotion) {
        el.scrollIntoView({ block: "start" });
        return;
      }

      gsap.to(window, {
        duration: 1.1,
        ease: "power3.inOut",
        scrollTo: { y: el, offsetY: 72, autoKill: false },
      });
    };

    const settle = window.setTimeout(scrollToHash, 300);
    const resettle = window.setTimeout(scrollToHash, 900);
    return () => {
      window.clearTimeout(settle);
      window.clearTimeout(resettle);
    };
  }, [reducedMotion]);

  // Per-section scroll reveal, ported from prototypes/10-cosmos.entry.js:
  // each section's content fades/slides in as you scroll to it, and reverses
  // if you scroll back up past it.
  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      REVEAL_SECTION_IDS.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        gsap.from(Array.from(section.children), {
          y: 34,
          opacity: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
      <Router>
        <div className="main-container">
          <GalaxyHero />
          <MissionHud />
          <Navigation />
          <Main />
          <Expertise />
          <Timeline />
          <Project />
          <Contact />
          <Footer />
        </div>
      </Router>
  );
}

export default App;
