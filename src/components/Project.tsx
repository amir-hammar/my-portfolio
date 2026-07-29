import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import "../assets/styles/Project.scss";
import { useTranslation } from "react-i18next";

import digiclipseMain from "../assets/images/projects/digiclipse_main.jpg";
import digiclipseShowcase from "../assets/images/projects/digiclipse_showcase.png";
import arcadeVideo from "../assets/images/projects/arcade.mp4";
import arcadeThumbnail from "../assets/images/projects/arcade_thumbnail.png";
import aspire from "../assets/images/projects/aspire.jpg";
import database from "../assets/images/projects/database.jpg";
import voiceTranslator from "../assets/images/projects/voice_translator.jpg";
import sscMain from "../assets/images/projects/ssc_main.png";
import sscSettings from "../assets/images/projects/ssc_settings.png";
import sga from "../assets/images/projects/sga.png";
import portfolio from "../assets/images/projects/portfolio.png";

gsap.registerPlugin(ScrollTrigger);

function Project() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    let playTimeout: NodeJS.Timeout;

    if (videoRef.current) {
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 80%",
          end: isMobile ? "bottom 15%" : "bottom 25%",
          onEnter: () => {
            clearTimeout(playTimeout);
            playTimeout = setTimeout(() => {
              videoRef.current?.play();
            }, 100);
          },
          onLeave: () => {
            clearTimeout(playTimeout);
            videoRef.current?.pause();
          },
          onEnterBack: () => {
            clearTimeout(playTimeout);
            playTimeout = setTimeout(() => {
              videoRef.current?.play();
            }, 100);
          },
          onLeaveBack: () => {
            clearTimeout(playTimeout);
            videoRef.current?.pause();
          },
        },
      });
    }

    return () => {
      clearTimeout(playTimeout);
    };
  });

  return (
    <div className="projects-container" id="projects">
      <h1>{t("projects.title")}</h1>
      <div className="projects-grid">
        <div className="project">
          <div className="image-container">
            <img
              src={digiclipseMain}
              className="zoom"
              alt="DigiClipse interface"
              width="50%"
            />
            <img
              src={digiclipseShowcase}
              className="zoom"
              alt="DigiClipse code"
              width="50%"
            />
          </div>
          <div className="project-title">
            <h2>{t("projects.digiclipse.title")}</h2>
          </div>
          <p dangerouslySetInnerHTML={{ __html: t("projects.digiclipse.description") }}/>
        </div>
        <div className="project">
          <video
            ref={videoRef}
            src={arcadeVideo}
            className="zoom"
            poster={arcadeThumbnail}
            loop
            muted
            playsInline
          />
          <div className="project-title">
            <h2>{t("projects.arcade.title")}</h2>
          </div>
          <p dangerouslySetInnerHTML={{ __html: t("projects.arcade.description") }}/>
        </div>
        <div className="project">
          <img
            src={aspire}
            className="zoom"
            alt="thumbnail"
            width="100%"
          />
          <div className="project-title">
            <h2>{t("projects.aspire.title")}</h2>
          </div>
          <p dangerouslySetInnerHTML={{ __html: t("projects.aspire.description") }}/>
        </div>
        <div className="project">
          <img
            src={database}
            className="zoom"
            alt="thumbnail"
            width="100%"
          />
          <div className="project-title">
            <h2>{t("projects.database.title")}</h2>
          </div>
          <p dangerouslySetInnerHTML={{ __html: t("projects.database.description") }}/>
        </div>
        <div className="project">
          <img
            src={voiceTranslator}
            className="zoom"
            alt="thumbnail"
            width="100%"
          />
          <div className="project-title">
            <h2>{t("projects.voiceTranslator.title")}</h2>
          </div>
          <p dangerouslySetInnerHTML={{ __html: t("projects.voiceTranslator.description") }}/>
        </div>
        <div className="project">
          <div className="image-container">
            <img
              src={sscMain}
              className="zoom main-image"
              alt="Main project view"
              width="100%"
            />
            <img
              src={sscSettings}
              className="zoom"
              alt="Project detail 1"
              width="100%"
            />
          </div>
          <div className="project-title">
            <h2>{t("projects.dataUpdater.title")}</h2>
          </div>
          <p dangerouslySetInnerHTML={{ __html: t("projects.dataUpdater.description") }}/>
        </div>
        <div className="project">
          <img
            src={sga}
            className="zoom"
            alt="thumbnail"
            width="100%"
          />
          <div className="project-title">
            <h2>{t("projects.classManagement.title")}</h2>
          </div>
          <p dangerouslySetInnerHTML={{ __html: t("projects.classManagement.description") }}/>
        </div>
        <div className="project">
          <img
            src={portfolio}
            className="zoom"
            alt="thumbnail"
            width="100%"
          />
          <div className="project-title">
            <h2>{t("projects.portfolio.title")}</h2>
          </div>
          <p dangerouslySetInnerHTML={{ __html: t("projects.portfolio.description") }}/>
        </div>
      </div>
    </div>
  );
}

export default Project;
