import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Same counter service as the hero star. No backend, no signup, and — like the
// star — no server-side de-duplication: the "you already tapped this" state is a
// soft localStorage guard, not a guarantee.
const API = "https://countapi.mileshilliard.com/api/v1";
const NS = "amir-hammar-cosmos-portfolio";

const REACTIONS = [
  { id: "design", emoji: "🎨" },
  { id: "animations", emoji: "✨" },
  { id: "projects", emoji: "💼" },
  { id: "collab", emoji: "🤝" },
  // Not every reaction is a compliment — an all-positive board reads as fake.
  { id: "bugs", emoji: "🐛" },
  { id: "confusing", emoji: "🤔" },
] as const;

type Counts = Record<string, number>;

const storageKey = (id: string) => `cosmos_feedback_${id}`;

function FeedbackReactions() {
  const { t } = useTranslation();
  const [counts, setCounts] = useState<Counts>({});
  const [tapped, setTapped] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      REACTIONS.map(({ id }) => [id, localStorage.getItem(storageKey(id)) === "1"])
    )
  );
  const [busy, setBusy] = useState<string | null>(null);

  // Fetched when this panel mounts, i.e. when the tab is actually opened, so
  // visitors who never look at it pay for none of these requests.
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      REACTIONS.map(({ id }) =>
        fetch(`${API}/get/${NS}.feedback-${id}`)
          .then((r) => r.json())
          // A key that nobody has ever hit returns {"error":"Key not found"},
          // which is simply zero rather than a failure.
          .then((d) => [id, typeof d.value === "number" ? d.value : 0] as const)
          .catch(() => [id, 0] as const)
      )
    ).then((pairs) => {
      if (!cancelled) setCounts(Object.fromEntries(pairs));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = async (id: string) => {
    if (busy) return;
    const next = !tapped[id];
    const current = counts[id] ?? 0;
    setBusy(id);

    // Optimistic: the tap should feel instant even on a slow connection.
    setTapped((prev) => ({ ...prev, [id]: next }));
    setCounts((prev) => ({ ...prev, [id]: Math.max(0, current + (next ? 1 : -1)) }));
    localStorage.setItem(storageKey(id), next ? "1" : "0");

    try {
      const url = next
        ? `${API}/hit/${NS}.feedback-${id}`
        : `${API}/set/${NS}.feedback-${id}?value=${Math.max(0, current - 1)}`;
      const d = await fetch(url).then((r) => r.json());
      if (typeof d.value === "number") {
        setCounts((prev) => ({ ...prev, [id]: d.value }));
      }
    } catch {
      // Roll back rather than leaving a tap that never landed.
      setTapped((prev) => ({ ...prev, [id]: !next }));
      setCounts((prev) => ({ ...prev, [id]: current }));
      localStorage.setItem(storageKey(id), next ? "0" : "1");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="feedback">
      <p className="feedback-lead">{t("contact.feedbackLead")}</p>

      <ul className="feedback-list">
        {REACTIONS.map(({ id, emoji }) => (
          <li key={id}>
            <button
              type="button"
              className={`feedback-chip${tapped[id] ? " tapped" : ""}`}
              onClick={() => toggle(id)}
              disabled={busy !== null}
              aria-pressed={tapped[id]}
            >
              <span className="feedback-emoji" aria-hidden="true">
                {emoji}
              </span>
              <span className="feedback-label">{t(`contact.reactions.${id}`)}</span>
              <span className="feedback-count">{counts[id] ?? "·"}</span>
            </button>
          </li>
        ))}
      </ul>

      <p className="feedback-hint">{t("contact.feedbackHint")}</p>
    </div>
  );
}

export default FeedbackReactions;
