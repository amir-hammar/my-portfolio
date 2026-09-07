import { useTranslation } from "react-i18next";
import portfolioEn from "../assets/images/projects/portfolio_en.webp";
import portfolioFr from "../assets/images/projects/portfolio_fr.webp";
import portfolioMobileEn from "../assets/images/projects/portfolio_mobile_en.webp";
import portfolioMobileFr from "../assets/images/projects/portfolio_mobile_fr.webp";

const DESKTOP = { en: portfolioEn, fr: portfolioFr };
const MOBILE = { en: portfolioMobileEn, fr: portfolioMobileFr };

/**
 * Same two-`<img>` shape as CoeurSolidaireShowcase (a full-bleed main shot
 * plus a `.project-inset` corner shot), so it inherits the row's hover CSS.
 * Language mirrors the site's own EN/FR switch via `i18n.language`, not a
 * control of its own — the hero screenshot itself is bilingual.
 */
function PortfolioShowcase() {
  const { i18n } = useTranslation();
  const lang = i18n.language === "fr" ? "fr" : "en";

  return (
    <>
      <img src={DESKTOP[lang]} alt="" loading="lazy" decoding="async" />
      <img
        className="project-inset portfolio-inset"
        src={MOBILE[lang]}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </>
  );
}

export default PortfolioShowcase;
