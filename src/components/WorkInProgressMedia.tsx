import { useTranslation } from "react-i18next";

/**
 * Stands in for a project that has no interface to screenshot yet.
 *
 * Deliberately not a mockup or a stock image: inventing a UI that doesn't
 * exist would misrepresent the work. A plain status card is honest, and it
 * still says something useful — what's built, and when it ships.
 */
function WorkInProgressMedia() {
  const { t } = useTranslation();

  return (
    <div className="wip-media">
      <span className="wip-badge">
        <span className="wip-dot" aria-hidden="true" />
        {t("projects.marketFlipper.wipBadge")}
      </span>

      <p className="wip-eta">{t("projects.marketFlipper.wipEta")}</p>
    </div>
  );
}

export default WorkInProgressMedia;
