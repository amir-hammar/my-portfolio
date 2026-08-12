import { useEffect, useRef } from "react";
import { gsap } from "gsap";
// Named import: the default export of gsap/dist/ScrollTrigger is not the
// plugin class, so ScrollTrigger.create() is undefined on it.
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

type ProjectEntry = {
  /** i18n key under `projects.*` */
  id: string;
  /** Primary full-bleed image. Omitted for the video entry. */
  image?: string;
  /** Optional second shot, insetted over the primary one. */
  inset?: string;
  video?: { src: string; poster: string };
};

const PROJECTS: ProjectEntry[] = [
  { id: "digiclipse", image: digiclipseMain, inset: digiclipseShowcase },
  { id: "arcade", video: { src: arcadeVideo, poster: arcadeThumbnail } },
  { id: "aspire", image: aspire },
  { id: "database", image: database },
  { id: "voiceTranslator", image: voiceTranslator },
  { id: "dataUpdater", image: sscMain, inset: sscSettings },
  { id: "classManagement", image: sga },
  { id: "portfolio", image: portfolio },
];

function Project() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play only while the clip is actually on screen. The short delay debounces
    // a fast scroll past it, which would otherwise start and immediately pause
    // playback. Previously this effect had no dependency array, so it re-ran and
    // re-created its ScrollTrigger on every single render.
    let playTimeout: ReturnType<typeof setTimeout>;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const play = () => {
      clearTimeout(playTimeout);
      playTimeout = setTimeout(() => {
        video.play().catch(() => {
          /* autoplay refused — poster stays up, which is fine */
        });
      }, 100);
    };
    const pause = () => {
      clearTimeout(playTimeout);
      video.pause();
    };

    const trigger = ScrollTrigger.create({
      trigger: video,
      start: "top 80%",
      end: isMobile ? "bottom 15%" : "bottom 25%",
      onEnter: play,
      onEnterBack: play,
      onLeave: pause,
      onLeaveBack: pause,
    });

    // ScrollTrigger caches each trigger's document position at creation time.
    // Every row here loads its image lazily, so this list's height keeps growing
    // after that measurement and pushes the triggers below it out of place.
    // GalaxyHero already refreshes on canvas resize, but its canvas is
    // viewport-sized and so never reacts to content reflow. Re-measure when the
    // list's own box changes (a ResizeObserver also fires once on subscribe) and
    // once more after every subresource has settled.
    let refreshTimer: ReturnType<typeof setTimeout>;
    const scheduleRefresh = () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    const ro = new ResizeObserver(scheduleRefresh);
    if (listRef.current) ro.observe(listRef.current);

    const loaded = document.readyState === "complete";
    if (!loaded) window.addEventListener("load", scheduleRefresh);

    return () => {
      clearTimeout(playTimeout);
      clearTimeout(refreshTimer);
      ro.disconnect();
      window.removeEventListener("load", scheduleRefresh);
      trigger.kill();
    };
  }, []);

  return (
    <section className="projects-container section-panel" id="projects">
      <header className="section-head">
        <span className="section-index">03</span>
        <h1>{t("projects.title")}</h1>
      </header>

      <ol className="projects-list" ref={listRef}>
        {PROJECTS.map((project, i) => (
          <li className="project" key={project.id}>
            <div className="project-media">
              {project.video ? (
                <video
                  ref={videoRef}
                  src={project.video.src}
                  poster={project.video.poster}
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img src={project.image} alt="" loading="lazy" decoding="async" />
              )}

              {project.inset && (
                <img
                  className="project-inset"
                  src={project.inset}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>

            <div className="project-body">
              <span className="project-no">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="project-copy">
                <h2>{t(`projects.${project.id}.title`)}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: t(`projects.${project.id}.description`),
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Project;
