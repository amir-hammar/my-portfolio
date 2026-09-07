import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CAN_BANK_X_MEDIA, type CanBankXRole } from "../data/canBankXMedia";

const ROLES: CanBankXRole[] = ["landing", "mfa", "home", "accounts", "transfer"];

/**
 * Same two-`<img>` shape as CoeurSolidaireShowcase (a full-bleed main shot
 * plus a `.project-inset` corner shot), so it inherits the row's hover CSS.
 * Language mirrors the site's own EN/FR switch via `i18n.language` — only the
 * `landing` role actually changes with it, since the authenticated screens
 * in the real app never localize past English.
 */
function CanBankXShowcase() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "fr" ? "fr" : "en";

  const [role, setRole] = useState<CanBankXRole>("landing");

  const shots = CAN_BANK_X_MEDIA[role];

  return (
    <>
      <img src={shots.desktop[lang]} alt="" loading="lazy" decoding="async" />
      <img
        className="project-inset coeur-inset"
        src={shots.mobile[lang]}
        alt=""
        loading="lazy"
        decoding="async"
      />

      <div className="coeur-overlay">
        <div className="coeur-tabs" role="tablist" aria-label="CanBankX">
          {ROLES.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={role === id}
              className={`coeur-tab${role === id ? " is-active" : ""}`}
              onClick={() => setRole(id)}
            >
              {t(`projects.canBankX.roles.${id}`)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default CanBankXShowcase;
