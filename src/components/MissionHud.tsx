import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "../assets/styles/MissionHud.scss";

// countapi.mileshilliard.com (spiritual successor to the original
// countapi.xyz) is free, public, requires no signup/auth, and — verified
// live — actually sends Access-Control-Allow-Origin so browser fetch works.
// Anyone who knows the key can read/increment it, so there's no server-side
// de-duplication; the "you already liked this" state is a soft,
// client-side-only guard via localStorage.
const KEY = "amir-hammar-cosmos-portfolio.hero-likes";
const API = "https://countapi.mileshilliard.com/api/v1";
const LIKED_KEY = "cosmos_liked";

interface CounterResponse {
  value: number;
}

function MissionHud() {
  const { t } = useTranslation();
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(() => localStorage.getItem(LIKED_KEY) === "1");
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [unlikeTries, setUnlikeTries] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);
  const [surrendered, setSurrendered] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API}/get/${KEY}`)
      .then((r) => r.json() as Promise<CounterResponse>)
      .then((d) => {
        if (!cancelled) setCount(d.value);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Taking a star back is deliberately hard. The first three attempts are
  // refused with an increasingly desperate plea; only the fourth goes through.
  // Nothing is sent to the counter during the refusals - they are pure theatre,
  // so the number on screen stays honest until the star is really withdrawn.
  const PLEAS = 3;

  const toggleLike = async () => {
    if (pending || count === null) return;

    if (liked && unlikeTries < PLEAS) {
      setUnlikeTries((n) => n + 1);
      setShakeKey((k) => k + 1);
      return;
    }

    const next = !liked;
    setPending(true);
    try {
      const url = next ? `${API}/hit/${KEY}` : `${API}/set/${KEY}?value=${count - 1}`;
      const res = await fetch(url);
      const data = (await res.json()) as CounterResponse;
      setCount(data.value);
      setLiked(next);
      localStorage.setItem(LIKED_KEY, next ? "1" : "0");
      setUnlikeTries(0);
      if (next) {
        setBurstKey((k) => k + 1);
        setSurrendered(false);
      } else {
        // Sulk briefly, then fall back to inviting them again.
        setSurrendered(true);
        window.setTimeout(() => setSurrendered(false), 3200);
      }
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  };

  const message = () => {
    if (unlikeTries > 0) return t(`hud.protest${unlikeTries}`);
    if (surrendered) return t("hud.surrendered");
    return liked ? t("hud.thanks") : t("hud.invite");
  };

  return (
    <div className="mission-hud">
      <button
        type="button"
        // `key` on the shake counter restarts the animation on every refused
        // press, so the third jolt is as visible as the first.
        key={shakeKey}
        className={`like-button${liked ? " liked" : ""}${
          unlikeTries > 0 ? " refusing" : ""
        }`}
        onClick={toggleLike}
        disabled={pending || failed || count === null}
        aria-pressed={liked}
        aria-label={message()}
        title={message()}
      >
        {liked ? <StarIcon /> : <StarBorderIcon />}
        <span key={burstKey} className="like-burst" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <i key={i} style={{ ["--i" as string]: i }} />
          ))}
        </span>
      </button>
      {/* Count and message are separate elements: the total is always on show,
          while the message alongside it swaps from asking for a star to
          acknowledging one. Folding the number into the message would have
          hidden it until after someone had already pressed. */}
      {failed ? (
        <span className="like-count">{t("hud.failed")}</span>
      ) : (
        <>
          <span className="like-count">
            {count === null ? "···" : count.toLocaleString()}
          </span>
          <span
            className={`like-message${liked ? " liked" : ""}${
              unlikeTries > 0 ? " protesting" : ""
            }`}
          >
            {message()}
          </span>
        </>
      )}
    </div>
  );
}

export default MissionHud;
