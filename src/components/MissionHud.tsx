import { useEffect, useState } from "react";
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
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(() => localStorage.getItem(LIKED_KEY) === "1");
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

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

  const toggleLike = async () => {
    if (pending || count === null) return;
    const next = !liked;
    setPending(true);
    try {
      const url = next ? `${API}/hit/${KEY}` : `${API}/set/${KEY}?value=${count - 1}`;
      const res = await fetch(url);
      const data = (await res.json()) as CounterResponse;
      setCount(data.value);
      setLiked(next);
      localStorage.setItem(LIKED_KEY, next ? "1" : "0");
      if (next) setBurstKey((k) => k + 1);
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mission-hud">
      <button
        type="button"
        className={`like-button${liked ? " liked" : ""}`}
        onClick={toggleLike}
        disabled={pending || failed || count === null}
        aria-pressed={liked}
        aria-label={liked ? "Unlike this galaxy" : "Like this galaxy"}
        title={liked ? "Unlike" : "Like"}
      >
        {liked ? <StarIcon /> : <StarBorderIcon />}
        <span key={burstKey} className="like-burst" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <i key={i} style={{ ["--i" as string]: i }} />
          ))}
        </span>
      </button>
      <span className="like-count">
        {failed ? "signal lost" : count === null ? "···" : `${count.toLocaleString()} stars given`}
      </span>
    </div>
  );
}

export default MissionHud;
