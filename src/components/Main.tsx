import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../assets/styles/Main.scss";
import avatar from "../assets/images/home/avatar_circle.jpeg";
import etsLogo from "../assets/images/home/ets.png";
import { useTranslation } from "react-i18next";

function Main() {
  const { t } = useTranslation();

  return (
    <section id="hero">
      <div className="hero-wrap">
        <div className="hero-body">
          <div className="portrait-stage">
            <svg className="orbit back" viewBox="0 0 420 420" aria-hidden="true">
              <path d="M 24 232 A 186 96 0 0 1 396 232" />
            </svg>

            <span className="halo" aria-hidden="true"></span>
            <img src={avatar} className="cutout" alt="Amir Hammar" />

            <svg className="orbit front" viewBox="0 0 420 420" aria-hidden="true">
              <path d="M 396 232 A 186 96 0 0 1 24 232" />
            </svg>

            <a
              className="moon moon-github"
              href="https://github.com/amir-hammar"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              title="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              className="moon moon-linkedin"
              href="https://www.linkedin.com/in/amirhammar/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </a>

            <a className="badge" href="#contact" aria-label="Let's talk">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path
                    id="badge-arc"
                    d="M 60 60 m -44 0 a 44 44 0 1 1 88 0 a 44 44 0 1 1 -88 0"
                  />
                </defs>
                <text>
                  <textPath href="#badge-arc" startOffset="0">
                    LET'S TALK &middot;{" "}
                  </textPath>
                </text>
              </svg>
              <span className="badge-dot"></span>
            </a>
          </div>

          <div className="hero-text">
            <h1 className="name">Amir Hammar</h1>
            <p className="role">{t("main.role")}</p>

            <div className="school">
              <a href="https://www.etsmtl.ca/" target="_blank" rel="noopener noreferrer">
                <img src={etsLogo} alt="ÉTS" />
              </a>
              <span>École de technologie supérieure &middot; Montréal</span>
            </div>
          </div>
        </div>

        <div className="scroll-hint">Scroll &#9662;</div>
      </div>
    </section>
  );
}

export default Main;
