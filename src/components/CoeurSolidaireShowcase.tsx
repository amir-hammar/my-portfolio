import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  COEUR_SOLIDAIRE_MEDIA,
  type CoeurRole,
  type CoeurTheme,
} from "../data/coeurSolidaireMedia";

const ROLES: CoeurRole[] = ["dashboard", "calendar", "route"];

/**
 * Renders as the two direct-child <img>s that Project.scss's row styling
 * expects (a full-bleed "main" shot plus a `.project-inset` corner shot), so
 * it inherits the same hover/scale rules as every other project row — see
 * `> img:not(.project-inset)` in Project.scss. Everything else (tabs, the
 * theme toggle) is layered on top as plain, non-`<img>` siblings, which those
 * selectors don't touch.
 *
 * Language is NOT a control here — it mirrors whatever the site's own
 * EN/FR switch is set to, via `i18n.language`. Adding a second language
 * toggle just for this one project would have meant two switches on the page
 * disagreeing with each other half the time.
 */
function CoeurSolidaireShowcase() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "fr" ? "fr" : "en";

  const [role, setRole] = useState<CoeurRole>("dashboard");
  const [theme, setTheme] = useState<CoeurTheme>("dark");

  const shots = COEUR_SOLIDAIRE_MEDIA[role];

  return (
    <>
      <img
        src={shots.desktop[theme][lang]}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <img
        className="project-inset coeur-inset"
        src={shots.mobile[theme][lang]}
        alt=""
        loading="lazy"
        decoding="async"
      />

      <div className="coeur-overlay">
        <div className="coeur-tabs" role="tablist" aria-label="CoeurSolidaire">
          {ROLES.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={role === id}
              className={`coeur-tab${role === id ? " is-active" : ""}`}
              onClick={() => setRole(id)}
            >
              {t(`projects.coeurSolidaire.roles.${id}`)}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="coeur-theme-toggle"
          onClick={() => setTheme((th) => (th === "dark" ? "light" : "dark"))}
          aria-pressed={theme === "light"}
          aria-label={t("projects.coeurSolidaire.themeToggle")}
          title={t("projects.coeurSolidaire.themeToggle")}
        >
          {theme === "dark" ? "☾" : "☀"}
        </button>
      </div>
    </>
  );
}

export default CoeurSolidaireShowcase;
