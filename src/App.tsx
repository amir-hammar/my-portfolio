import { useState, useEffect } from "react";
import {
  Main,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
} from "./components";
import Timeline from "./components/Timeline/Timeline";
import FadeIn from "./components/FadeIn";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import i18n from "./i18n";

function App() {
  const [mode, setMode] = useState<string>(() => {
    // Get saved mode from localStorage, default to 'dark' if none exists
    return localStorage.getItem("colorMode") || "dark";
  });

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const handleModeChange = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("colorMode", newMode);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
      <Router>
        <div
          className={`main-container ${
            mode === "dark" ? "dark-mode" : "light-mode"
          }`}
        >
          <Navigation
          parentToChild={{ mode }}
          modeChange={handleModeChange}
          onLanguageChange={handleLanguageChange}
          />
          <FadeIn transitionDuration={700}>
            <Main />
            <Expertise />
            <Timeline />
            <Project />
            <Contact />
          </FadeIn>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
