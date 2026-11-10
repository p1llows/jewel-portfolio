import { buildContributionData } from "@/lib/github";
import type { ContributionDay, GitHubContributionData } from "@/types/github";

/**
 * The site is a static export (output: "export"), so /api/github-contributions is
 * frozen at build time. To keep the graph current we fetch live, from the browser,
 * from a public CORS-enabled mirror of GitHub's contribution calendar.
 */
const LIVE_ENDPOINT = (username: string) =>
  `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`;

const CACHE_KEY = (username: string) => `gh-contrib:v1:${username}`;
const CACHE_MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

function intensityFor(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

interface CachedEntry {
  savedAt: number;
  data: GitHubContributionData;
}

export function readCachedContributions(username: string): CachedEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY(username));
    if (!raw) return null;
    const entry = JSON.parse(raw) as CachedEntry;
    return entry?.data?.weeks?.length ? entry : null;
  } catch {
    return null;
  }
}

function writeCache(username: string, data: GitHubContributionData) {
  try {
    localStorage.setItem(CACHE_KEY(username), JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    /* storage unavailable (private mode / quota) — ignore */
  }
}

export function isCacheFresh(entry: CachedEntry): boolean {
  return Date.now() - entry.savedAt < CACHE_MAX_AGE_MS;
}

async function fetchLive(username: string, signal?: AbortSignal): Promise<GitHubContributionData> {
  const res = await fetch(LIVE_ENDPOINT(username), { signal });
  if (!res.ok) throw new Error(`Live contributions request failed (${res.status})`);

  const json = (await res.json()) as {
    total?: Record<string, number>;
    contributions?: { date: string; count: number }[];
  };

  if (!json.contributions?.length) throw new Error("Live contributions response was empty");

  const days: ContributionDay[] = json.contributions.map((c) => {
    const [y, m, d] = c.date.split("-").map(Number);
    return {
      date: c.date,
      count: c.count,
      intensity: intensityFor(c.count),
      weekday: new Date(Date.UTC(y, m - 1, d)).getUTCDay(),
    };
  });

  const total = json.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0);
  return buildContributionData(username, days, total);
}

async function fetchSnapshot(username: string, signal?: AbortSignal): Promise<GitHubContributionData> {
  const res = await fetch(`/api/github-contributions?username=${encodeURIComponent(username)}`, { signal });
  const json = await res.json();
  if (!json?.success || !json.weeks?.length) {
    throw new Error(json?.error || "Unable to load GitHub activity.");
  }
  return json as GitHubContributionData;
}

/** Live data first; the build-time snapshot is only a last resort. */
export async function fetchContributionsClient(
  username: string,
  signal?: AbortSignal
): Promise<GitHubContributionData> {
  try {
    const data = await fetchLive(username, signal);
    writeCache(username, data);
    return data;
  } catch (err) {
    if ((err as Error)?.name === "AbortError") throw err;
    return fetchSnapshot(username, signal);
  }
}
