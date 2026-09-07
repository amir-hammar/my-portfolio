import { useTranslation } from "react-i18next";

/**
 * FreeEaTS has no interface — it's a scraper that syncs straight into a
 * shared Google Calendar. A mock of that calendar event stands in for a
 * screenshot, rather than inventing a UI that doesn't exist.
 */
function FreeEatsMedia() {
  const { t } = useTranslation();

  return (
    <div className="free-eats-media">
      <div className="free-eats-scan">
        <span className="free-eats-dot" aria-hidden="true" />
        <span>free-eats-bot · scanning campus clubs…</span>
      </div>

      <div className="free-eats-event">
        <div className="free-eats-event-head">
          <span className="free-eats-emoji" aria-hidden="true">🍕</span>
          <span className="free-eats-cal" aria-hidden="true">📅</span>
        </div>
        <p className="free-eats-title">Free pizza — Club Robotique</p>
        <p className="free-eats-meta">Today · 12:00 PM · Pavillon A</p>
        <span className="free-eats-added">Added to calendar</span>
      </div>

      <span className="free-eats-badge">{t("projects.freeEats.noInterface")}</span>
    </div>
  );
}

export default FreeEatsMedia;
