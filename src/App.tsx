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

const REVEAL_SECTION_IDS = ["history", "projects", "expertise", "contact"];

function App() {
  const reducedMotion = useReducedMotion();

  // A shared link can name its target two ways: `?p=coeurSolidaire` or
  // `#coeurSolidaire`. The query parameter exists because LinkedIn (and most
  // social platforms) route outbound links through their own redirector, and
  // a URL fragment is client-side only — it never reaches the server, so it
  // is dropped on the redirect and the link lands at the top of the page
  // instead. A query parameter survives that round trip.
  const deepLinkTarget = () => {
    const fromQuery = new URLSearchParams(window.location.search).get("p");
    return fromQuery || window.location.hash.slice(1);
  };

  // Whichever form it arrived in, that link should land on the project, not
  // snap back to the top — so this stands down when there's a target.
  useEffect(() => {
    if (deepLinkTarget()) return;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Jumps to whatever the link names — a project id, or one of the four main
  // sections — using the same eased scroll the nav itself uses, rather than
  // the browser's own instant anchor jump. Fired twice: once shortly after
  // mount, and once again a bit later to correct for layout that's still
  // settling then (lazy-loaded project images above the target changing the
  // page's height as they load in).
  useEffect(() => {
    const target = deepLinkTarget();
    if (!target) return;

    const scrollToTarget = () => {
      const el = document.getElementById(target);
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

    const settle = window.setTimeout(scrollToTarget, 300);
    const resettle = window.setTimeout(scrollToTarget, 900);
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
          <Timeline />
          <Project />
          <Expertise />
          <Contact />
          <Footer />
        </div>
      </Router>
  );
}

export default App;
