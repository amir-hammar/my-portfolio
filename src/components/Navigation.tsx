import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListIcon from "@mui/icons-material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollToPlugin);

const drawerWidth = 240;

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

  const drawer = (
    <Box
      className="navigation-bar-responsive"
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", height: "100%" }}
    >
      <p className="mobile-menu-top">
        <ListIcon />
        Menu
      </p>
      <Divider />
      <List>
        {NAV_SECTIONS.map(({ id, labelKey }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => scrollToSection(id)}
            >
              <ListItemText primary={t(labelKey)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
          <div className="nav-cell nav-brand">
            <button
              type="button"
              className="brand-button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="brand-name">Amir Hammar</span>
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

          <div className="nav-cell nav-burger">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </nav>
      </header>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            display: { xs: "block", sm: "none" },
            width: drawerWidth,
            overflowY: "hidden",
            backgroundColor: "#0d1116",
            "& span, & p": { color: "#fcfcfc" },
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navigation;
