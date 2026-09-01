import { useState } from "react";
import "../assets/styles/Contact.scss";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useTranslation } from "react-i18next";
import FeedbackReactions from "./FeedbackReactions";

const LINKEDIN_URL = "https://www.linkedin.com/in/amirhammar/";
const EMAIL = "amirhammar2206@gmail.com";

type Tab = "reach" | "feedback";

function Contact() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("reach");

  return (
    <div id="contact" className="section-panel">
      <div className="contact-wrapper">
        <header className="section-head">
          <span className="section-index">04</span>
          <h1>{t("contact.title")}</h1>
        </header>

        {/* Two intentions, one section: people who want a reply, and people who
            just want to say the site was good. Tabs keep them apart without
            making the second one feel like an afterthought bolted underneath. */}
        <div className="contact-tabs" role="tablist" aria-label={t("contact.title")}>
          {(["reach", "feedback"] as Tab[]).map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`contact-tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`contact-panel-${id}`}
              className={`contact-tab${tab === id ? " is-active" : ""}`}
              onClick={() => setTab(id)}
            >
              {t(id === "reach" ? "contact.tabReach" : "contact.tabFeedback")}
            </button>
          ))}
          <span
            className={`contact-tab-thumb${tab === "feedback" ? " right" : ""}`}
            aria-hidden="true"
          />
        </div>

        {tab === "reach" ? (
          <div
            className="contact-panel"
            role="tabpanel"
            id="contact-panel-reach"
            aria-labelledby="contact-tab-reach"
          >
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
        ) : (
          <div
            className="contact-panel"
            role="tabpanel"
            id="contact-panel-feedback"
            aria-labelledby="contact-tab-feedback"
          >
            {/* Mounted only while its tab is open, so its four counter requests
                never fire for visitors who don't open it. */}
            <FeedbackReactions />
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
