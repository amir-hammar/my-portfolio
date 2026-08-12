import React from "react";
import "../assets/styles/Contact.scss";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();
  const handleEmailClick = () => {
    window.location.href = "mailto:amirhammar2206@gmail.com";
  };

  return (
    <div id="contact" className="section-panel">
      <div className="items-container">
        <div className="contact_wrapper">
          <header className="section-head">
            <span className="section-index">04</span>
            <h1>{t("contact.title")}</h1>
          </header>
          <p>
            {t("contact.description")}
          </p>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleEmailClick}
            className="email-button"
          >
            {t("contact.button")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Contact;