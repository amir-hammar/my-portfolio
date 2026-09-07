import { useTranslation } from "react-i18next";

/**
 * Stands in for a project built under NDA — no screenshots exist to show.
 * A redacted-document look communicates that directly rather than leaving
 * the frame looking broken or empty.
 */
function ConfidentialMedia() {
  const { t } = useTranslation();

  return (
    <div className="confidential-media">
      <div className="confidential-stamp">{t("projects.stingray.confidential")}</div>

      <div className="confidential-doc">
        <span className="confidential-line" style={{ width: "72%" }} />
        <span className="confidential-line" style={{ width: "94%" }} />
        <span className="confidential-line" style={{ width: "58%" }} />
        <span className="confidential-line" style={{ width: "83%" }} />
        <span className="confidential-line" style={{ width: "67%" }} />
      </div>

      <p className="confidential-note">🔒 {t("projects.stingray.confidentialNote")}</p>
    </div>
  );
}

export default ConfidentialMedia;
