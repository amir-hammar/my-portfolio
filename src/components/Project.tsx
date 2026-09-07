import { useEffect, useRef } from "react";
import { gsap } from "gsap";
// Named import: the default export of gsap/dist/ScrollTrigger is not the
// plugin class, so ScrollTrigger.create() is undefined on it.
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/styles/Project.scss";
import { useTranslation } from "react-i18next";
import CoeurSolidaireShowcase from "./CoeurSolidaireShowcase";
import WorkInProgressMedia from "./WorkInProgressMedia";
import CanBankXShowcase from "./CanBankXShowcase";
import ConfidentialMedia from "./ConfidentialMedia";
import FreeEatsMedia from "./FreeEatsMedia";

import digiclipseMain from "../assets/images/projects/digiclipse_main.webp";
import digiclipseShowcase from "../assets/images/projects/digiclipse_showcase.webp";
import arcadeVideo from "../assets/images/projects/arcade.mp4";
import arcadeThumbnail from "../assets/images/projects/arcade_thumbnail.webp";
import aspire from "../assets/images/projects/aspire.webp";
import database from "../assets/images/projects/database.webp";
import voiceTranslator from "../assets/images/projects/voice_translator.webp";
import sscMain from "../assets/images/projects/ssc_main.webp";
import sscSettings from "../assets/images/projects/ssc_settings.webp";
import sga from "../assets/images/projects/sga.webp";
import PortfolioShowcase from "./PortfolioShowcase";

gsap.registerPlugin(ScrollTrigger);

/** Looked up as `projects.types.<key>` — the label text lives in i18n since
 *  it differs by language, this key doesn't. */
type ProjectType = "freelance" | "school" | "involvement" | "personal" | "professional";

type ProjectEntry = {
  /** i18n key under `projects.*` */
  id: string;
  /** Primary full-bleed image. Omitted for the video entry or a custom media component. */
  image?: string;
  /** Optional second shot, insetted over the primary one. */
  inset?: string;
  video?: { src: string; poster: string };
  /** Renders in place of the plain image/inset pair, for a project whose media
   *  needs its own interactive behaviour (role tabs, a theme toggle) or has no
   *  interface to show yet. */
  media?: () => JSX.Element;
  /** Shown as chips above the copy. Kept here rather than in i18n: these are
   *  product names, identical in both languages, so translating them would
   *  mean maintaining two copies of the same list. */
  stack: string[];
  /** How the project came about — freelance work, a school assignment, a
   *  club, personal initiative, or a professional/internship deliverable. */
  type: ProjectType;
};

const PROJECTS: ProjectEntry[] = [
  // Most recent client work leads the list.
  {
    id: "coeurSolidaire",
    media: CoeurSolidaireShowcase,
    stack: [
      "C#",
      "ASP.NET Core",
      "React Native",
      "Expo",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    type: "freelance",
  },
  {
    id: "marketFlipper",
    media: WorkInProgressMedia,
    stack: [
      "C#",
      "ASP.NET Core",
      "React Native",
      "PostgreSQL",
      "Redis",
      "Supabase",
      "Hangfire",
      "xUnit",
      "Docker",
    ],
    type: "freelance",
  },
  {
    id: "canBankX",
    media: CanBankXShowcase,
    stack: ["React", "TypeScript", "Rust", "PostgreSQL", "Redis", "Keycloak", "KrakenD", "Docker"],
    type: "school",
  },
  {
    id: "digiclipse",
    image: digiclipseMain,
    inset: digiclipseShowcase,
    stack: ["Python", "Pandas", "Docker", "REST APIs"],
    type: "involvement",
  },
  {
    id: "arcade",
    video: { src: arcadeVideo, poster: arcadeThumbnail },
    stack: ["Arduino", "C++", "Electronics"],
    type: "school",
  },
  {
    id: "portfolio",
    media: PortfolioShowcase,
    stack: ["React", "TypeScript", "Three.js", "GSAP", "Vite", "SASS"],
    type: "personal",
  },
  {
    id: "stingray",
    media: ConfidentialMedia,
    stack: ["Java", "Google Cloud Platform", "Apache Beam", "BigQuery", "Jira"],
    type: "professional",
  },
  {
    id: "dataUpdater",
    image: sscMain,
    inset: sscSettings,
    stack: ["Python", "customTkinter", "Excel"],
    type: "professional",
  },
  {
    id: "freeEats",
    media: FreeEatsMedia,
    stack: ["Python", "Google Calendar API"],
    type: "personal",
  },
  {
    id: "aspire",
    image: aspire,
    stack: ["Python", "OpenAI GPT 3", "REST APIs"],
    type: "personal",
  },
  {
    id: "database",
    image: database,
    stack: ["MariaDB", "SQL", "Raspberry Pi", "HTML/CSS"],
    type: "school",
  },
  {
    id: "voiceTranslator",
    image: voiceTranslator,
    stack: ["Python", "OpenAI Whisper", "NumPy", "REST APIs"],
    type: "personal",
  },
  {
    id: "classManagement",
    image: sga,
    stack: ["TypeScript", "Pug", "CSS"],
    type: "school",
  },
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
            <div
              className={`project-media${
                project.id === "coeurSolidaire" ? " coeur-media" : ""
              }${
                // All 5 CanBankX tabs share this same 1894x980 shot, which is
                // narrower than the row's 16:7 frame — cover crops it
                // vertically, and centered that crop was cutting into the
                // page header at the top.
                project.id === "canBankX" ? " canbankx-media" : ""
              }${
                // These two source shots are far wider than the generic
                // mobile 4:3 frame (2.29 and 2.49 vs 1.33), so cover crops
                // almost all of the width away and reads as zoomed in.
                project.id === "portfolio" || project.id === "classManagement"
                  ? " wide-media"
                  : ""
              }`}
            >
              {project.media ? (
                <project.media />
              ) : project.video ? (
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

                {/* Resume-style meta: when it happened and what kind of
                    project it was, both read straight from i18n since the
                    date format and type label differ by language. */}
                <div className="project-meta">
                  <span className="project-date">{t(`projects.${project.id}.date`)}</span>
                  <span className="project-type">{t(`projects.types.${project.type}`)}</span>
                </div>

                {/* Stack first, as its own row of chips — the copy underneath
                    is then free to explain what the thing actually is instead
                    of listing technologies mid-sentence. */}
                <ul className="project-stack">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <p>{t(`projects.${project.id}.description`)}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Project;
