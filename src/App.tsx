import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SECTION_IDS = ["expertise", "history", "projects", "contact"];

function App() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
