import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SKILL_CATEGORIES } from "../data/skills";
import "../assets/styles/Expertise.scss";

function Expertise() {
  const { t } = useTranslation();

  return (
    <section className="container" id="expertise">
      <div className="skills-container section-panel">
        <header className="section-head">
          <span className="section-index">01</span>
          <h1>{t("expertise.title")}</h1>
        </header>

        <div className="skills-grid">
          {SKILL_CATEGORIES.map((category) => (
            <div className="skill" key={category.id}>
              <div className="skill-head">
                <FontAwesomeIcon icon={category.icon} className="skill-head-icon" />
                <h3>{t(`expertise.${category.id}.title`)}</h3>
              </div>

              <ul className="tech-list">
                {category.skills.map((skill) => {
                  const label = t(`expertise.${category.id}.skills.${skill.key}`);
                  return (
                    <li className="tech" key={skill.key} tabIndex={0}>
                      <span className="tech-mark">
                        {skill.logo ? (
                          // Two stacked copies of the same mark: a white-knocked-out
                          // one on top of the full-colour original. Hover crossfades
                          // between them. A single <img> can't do this — CSS cannot
                          // interpolate `filter: brightness(0) invert(1)` to `none`
                          // without passing through a garbled mid-state, and the
                          // knockout is what makes marks that are natively near-black
                          // (GitHub #181616, Bash #293138, JSON, IntelliJ) legible on
                          // this background at all.
                          <>
                            <img
                              className="tech-mono"
                              src={skill.logo}
                              alt=""
                              aria-hidden="true"
                              loading="lazy"
                              decoding="async"
                            />
                            <img
                              className="tech-color"
                              src={skill.logo}
                              alt=""
                              aria-hidden="true"
                              loading="lazy"
                              decoding="async"
                            />
                          </>
                        ) : (
                          <FontAwesomeIcon icon={skill.glyph!} className="tech-glyph" />
                        )}
                      </span>
                      <span className="tech-name">{label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Expertise;
