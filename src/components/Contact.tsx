import "../assets/styles/Contact.scss";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useTranslation } from "react-i18next";

const LINKEDIN_URL = "https://www.linkedin.com/in/amirhammar/";
const EMAIL = "amirhammar2206@gmail.com";

function Contact() {
  const { t } = useTranslation();

  return (
    <div id="contact" className="section-panel">
      <div className="contact-wrapper">
        <header className="section-head">
          <span className="section-index">04</span>
          <h1>{t("contact.title")}</h1>
        </header>

        <p className="contact-lead">{t("contact.description")}</p>

        <div className="contact-actions">
          {/* LinkedIn leads: it's the channel that gets a reply fastest, and
              the one most people reaching out from a portfolio already use. */}
          <a
            className="contact-btn contact-btn--primary"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            <LinkedInIcon />
            {t("contact.linkedinButton")}
          </a>

          <a className="contact-btn contact-btn--ghost" href={`mailto:${EMAIL}`}>
            <MailOutlineIcon />
            {t("contact.emailButton")}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
