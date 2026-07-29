import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../assets/styles/Main.scss";
import avatar from "../assets/images/home/avatar_circle.jpeg";
import etsLogo from "../assets/images/home/ets.png";
import { useTranslation } from "react-i18next";

function Main() {
  const { t } = useTranslation();
  
  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a
              href="https://github.com/amir-hammar"
              target="_blank"
              rel="noreferrer noopener"
              title="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/amirhammar/"
              target="_blank"
              rel="noreferrer noopener"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
          <h1>Amir Hammar</h1>
          <div className="student-info">
            <p>{t("main.role")}</p>
          </div>
          <div className="school-logo">
            <a
              href="https://www.etsmtl.ca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={etsLogo}
                alt="ÉTS Logo"
                className="ets-logo"
              />
            </a>
          </div>
          <div className="mobile_social_icons">
            <a
              href="https://github.com/amir-hammar"
              target="_blank"
              rel="noreferrer noopener"
              title="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/amirhammar/"
              target="_blank"
              rel="noreferrer noopener"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
