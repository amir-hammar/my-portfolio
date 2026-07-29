import { useState, useEffect } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../../assets/styles/Timeline.scss";

import stingrayLogo from "../../assets/images/logos/stingray.png";
import sscLogo from "../../assets/images/logos/ssc.png";
import matroxLogo from "../../assets/images/logos/matrox.png";
import addatechLogo from "../../assets/images/logos/addatech.png";
import TimelineItem from "./TimelineItem";
import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

function Timeline() {
  const { t } = useTranslation();
  const [activeElement, setActiveElement] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  const renderTechStack = (technologies: string[]) => (
    <div className="tech-stack">
      {technologies.map((tech, index) => (
        <Chip key={index} label={tech} className="tech-chip" size="small" />
      ))}
    </div>
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="history">
      <div className="items-container">
        <h1>{t("career.title")}</h1>
        <VerticalTimeline>
          <TimelineItem
            index={0}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
            isMobile={isMobile}
            date={t("career.stingray.date")}
            title={t("career.stingray.title")}
            company={t("career.stingray.company")}
            city={t("career.stingray.city")}
            logo={
              <img
                src={stingrayLogo}
                alt=""
              />
            }
            details={
              <>
                <p>
                  <strong>{t("career.stingray.tasks.title")}:</strong>
                </p>
                <ul>
                  {(
                    t("career.stingray.tasks.list", {
                      returnObjects: true,
                    }) as string[]
                  ).map((task: string, index: number) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{ __html: task }}
                    />
                  ))}
                </ul>
                <p>
                  <strong>{t("career.stingray.technologies.title")}:</strong>
                </p>
                {renderTechStack(
                  t("career.stingray.technologies.stack", {
                    returnObjects: true,
                  })
                )}
              </>
            }
          />

          <TimelineItem
            index={1}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
            isMobile={isMobile}
            date={t("career.ssc.date")}
            title={t("career.ssc.title")}
            company={t("career.ssc.company")}
            city={t("career.ssc.city")}
            logo={
              <img src={sscLogo} alt="" />
            }
            details={
              <>
                <p>
                  <strong>{t("career.ssc.tasks.title")}:</strong>
                </p>
                <ul>
                  {(
                    t("career.ssc.tasks.list", {
                      returnObjects: true,
                    }) as string[]
                  ).map((task: string, index: number) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{ __html: task }}
                    />
                  ))}
                </ul>
                <p>
                  <strong>{t("career.ssc.technologies.title")}:</strong>
                </p>
                {renderTechStack(
                  t("career.ssc.technologies.stack", {
                    returnObjects: true,
                  })
                )}
              </>
            }
          />

          <TimelineItem
            index={2}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
            isMobile={isMobile}
            date={t("career.matrox.date")}
            title={t("career.matrox.title")}
            company={t("career.matrox.company")}
            city={t("career.matrox.city")}
            logo={
              <img
                src={matroxLogo}
                alt=""
              />
            }
            details={
              <>
                <p>
                  <strong>{t("career.matrox.tasks.title")}:</strong>
                </p>
                <ul>
                  {(
                    t("career.matrox.tasks.list", {
                      returnObjects: true,
                    }) as string[]
                  ).map((task: string, index: number) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{ __html: task }}
                    />
                  ))}
                </ul>
                <p>
                  <strong>{t("career.matrox.technologies.title")}:</strong>
                </p>
                {renderTechStack(
                  t("career.matrox.technologies.stack", {
                    returnObjects: true,
                  })
                )}
              </>
            }
          />

          <TimelineItem
            index={3}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
            isMobile={isMobile}
            date={t("career.addatech.date")}
            title={t("career.addatech.title")}
            company={t("career.addatech.company")}
            city={t("career.addatech.city")}
            logo={
              <img
                src={addatechLogo}
                alt=""
              />
            }
            details={
              <>
                <p>
                  <strong>{t("career.addatech.tasks.title")}:</strong>
                </p>
                <ul>
                  {(
                    t("career.addatech.tasks.list", {
                      returnObjects: true,
                    }) as string[]
                  ).map((task: string, index: number) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{ __html: task }}
                    />
                  ))}
                </ul>
                <p>
                  <strong>{t("career.addatech.technologies.title")}:</strong>
                </p>
                {renderTechStack(
                  t("career.addatech.technologies.stack", {
                    returnObjects: true,
                  })
                )}
              </>
            }
          />
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
