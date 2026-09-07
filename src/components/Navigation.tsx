import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import CssBaseline from "@mui/material/CssBaseline";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollToPlugin);

const NAV_SECTIONS = [
  { id: "expertise", labelKey: "navigation.expertise" },
  { id: "history", labelKey: "navigation.career" },
  { id: "projects", labelKey: "navigation.projects" },
  { id: "contact", labelKey: "navigation.contact" },
];

// Module-level, not defined inside Navigation's render body: a component
// declared per-render is a *different type* on every render to React, which
// unmounts and remounts its whole DOM subtree every time — here, on every
// single language change. That silently broke rapid/repeated clicks (a click
// on a just-remounted button can land on a node that's already been replaced
// by the next render) and is also what the react-hooks/static-components
// lint rule was flagging.
function LanguageSwitch() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  // A real toggle: clicking anywhere on the control flips the language,
  // regardless of which side you hit — not "set to FR" / "set to EN".
  const toggleLanguage = () => i18n.changeLanguage(isFr ? "en" : "fr");
  return (
    <div
      className={`lang-switch${isFr ? " lang-switch--fr" : ""}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        className={!isFr ? "active" : ""}
        aria-pressed={!isFr}
        onClick={toggleLanguage}
      >
        EN
      </button>
      <button
        type="button"
        className={isFr ? "active" : ""}
        aria-pressed={isFr}
        onClick={toggleLanguage}
      >
        FR
      </button>
      <span className="lang-switch-thumb" aria-hidden="true" />
    </div>
  );
}

function Navigation() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [active, setActive] = useState<string>("");

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight whichever section currently owns the middle of the viewport.
  // rootMargin pins the detection band to a thin strip there so the active
  // link changes once, decisively, instead of flickering between two sections
  // that are both partly visible.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // The overlay replaces MUI's Drawer, so the two behaviours it gave us for
  // free have to be restated: close on Escape, and stop the page scrolling
  // underneath while the menu covers it.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const scrollToSection = useCallback(
    (section: string) => {
      const el = document.getElementById(section);
      if (!el) return;

      if (reducedMotion) {
        el.scrollIntoView();
        return;
      }

      // gsap's ScrollToPlugin rather than scrollIntoView({behavior:"smooth"}):
      // the native easing can't be tuned, and its duration scales with distance,
      // so jumping to a far section crawled. offsetY keeps the target clear of
      // the fixed bar.
      gsap.to(window, {
        duration: 1.1,
        ease: "power3.inOut",
        scrollTo: { y: el, offsetY: 72, autoKill: true },
      });
    },
    [reducedMotion]
  );

  const goTo = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <CssBaseline />
      {/* Plain <header> rather than MUI's AppBar/Toolbar: the segmented rules
          have to span the bar's full height, and AppBar's own padding, min-height
          and elevation all had to be unset to get there. */}
      <header
        id="navigation"
        className={`site-nav${scrolled ? " scrolled" : ""}`}
      >
        <nav className="site-nav-inner" aria-label="Main">
          <div className="nav-cell nav-burger">
            {/* Hand-drawn rather than MUI's MenuIcon. `color="inherit"` walked up
                to <body>, which has no colour of its own, so it landed on
                CssBaseline's rgba(0,0,0,0.87) - a near-black glyph on a near-black
                bar. Two hairline bars also sit better with the rest of the chrome
                than a three-bar glyph. */}
            <button
              type="button"
              className={`burger${mobileOpen ? " is-open" : ""}`}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={handleDrawerToggle}
            >
              <span className="burger-bar" />
              <span className="burger-bar" />
            </button>
          </div>
          <div className="nav-cell nav-links">
            {NAV_SECTIONS.map(({ id, labelKey }) => (
              <button
                key={id}
                type="button"
                className={`nav-link${active === id ? " is-active" : ""}`}
                aria-current={active === id ? "true" : undefined}
                onClick={() => scrollToSection(id)}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>

          <div className="nav-cell nav-actions">
            <LanguageSwitch />
            <button
              type="button"
              className="nav-cta"
              onClick={() => scrollToSection("contact")}
            >
              {t("navigation.talk")}
            </button>
          </div>

        </nav>
      </header>

      {/* Full-screen overlay, always mounted so it can animate closed as well
          as open. It irises out of the burger with an expanding circular
          clip-path, and the links stagger in behind it. */}
      <div
        id="mobile-menu"
        className={`menu-overlay${mobileOpen ? " is-open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="menu-overlay-head">
          <span className="menu-overlay-label">Menu</span>
          <button
            type="button"
            className="menu-close"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <span className="close-x" />
          </button>
        </div>

        <nav className="menu-overlay-links" aria-label="Sections">
          {NAV_SECTIONS.map(({ id, labelKey }, i) => (
            <button
              key={id}
              type="button"
              tabIndex={mobileOpen ? 0 : -1}
              className={`menu-overlay-link${active === id ? " is-active" : ""}`}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => goTo(id)}
            >
              <span className="menu-overlay-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="menu-overlay-text">{t(labelKey)}</span>
            </button>
          ))}
        </nav>

        <div className="menu-overlay-foot">
          <button
            type="button"
            tabIndex={mobileOpen ? 0 : -1}
            className="menu-overlay-cta"
            onClick={() => goTo("contact")}
          >
            {t("navigation.talk")}
          </button>
        </div>
      </div>
    </>
  );
}

export default Navigation;
