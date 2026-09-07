import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../assets/styles/Footer.scss";
import { useTranslation } from "react-i18next";
import FeedbackReactions from "./FeedbackReactions";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-feedback">
        <FeedbackReactions />
      </div>

      <div className="footer-socials">
        <a
          className="social-orb"
          href="https://github.com/amir-hammar"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
          title="GitHub"
        >
          <GitHubIcon />
        </a>
        <a
          className="social-orb"
          href="https://www.linkedin.com/in/amirhammar/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <LinkedInIcon />
        </a>
      </div>

      <a className="footer-mail" href="mailto:amirhammar2206@gmail.com">
        amirhammar2206@gmail.com
      </a>

      <p className="footer-note">{t("main.footer")}</p>
    </footer>
  );
}

export default Footer;

