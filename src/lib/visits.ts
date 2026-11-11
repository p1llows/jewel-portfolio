const DEFAULT_COUNT = 12847;
const TABLE_ID = "total_visits";

// The project URL and publishable key are public by design (they ship to every visitor's browser; access is
// enforced by row-level security). They are used as a fallback so the counter still works when the hosting
// build doesn't provide NEXT_PUBLIC_SUPABASE_* env vars.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xurrtlatvgtatmvhosxi.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_eryZwmklCrOHqiHbTj6FCA_3eXSfUrB";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

/**
 * Visitor counter, run in the browser.
 * The site is a static export (no server), so the counter talks to Supabase's REST API (PostgREST) directly.
 * Plain `fetch` is used instead of supabase-js, which would add ~185 KB of mostly unused JavaScript.
 *
 * Returns the current total; `increment` records a new visit (call once per session).
 * Never throws: falls back to the default number.
 */
export async function getVisitCount(increment: boolean): Promise<number> {
  try {
    if (increment) {
      // Preferred: atomic SQL function
      const rpc = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_visits`, {
        method: "POST",
        headers,
        body: JSON.stringify({ page_id: TABLE_ID }),
      });
      if (rpc.ok) {
        const value = await rpc.json();
        if (typeof value === "number" || typeof value === "string") return Number(value);
      } else {
        console.warn("increment_visits RPC failed, falling back to upsert:", rpc.status);
      }

      // Fallback: read + upsert (not atomic, only used if the SQL function is missing)
      const current = await readCount();
      const next = (current ?? DEFAULT_COUNT) + 1;
      const upsert = await fetch(`${SUPABASE_URL}/rest/v1/page_views`, {
        method: "POST",
        headers: { ...headers, Prefer: "resolution=merge-duplicates" },
        body: JSON.stringify({ id: TABLE_ID, count: next, updated_at: new Date().toISOString() }),
      });
      if (!upsert.ok) {
        console.warn("Visit upsert failed:", upsert.status);
        return current ?? DEFAULT_COUNT;
      }
      return next;
    }

    return (await readCount()) ?? DEFAULT_COUNT;
  } catch (err) {
    console.warn("Visit counter error:", err);
    return DEFAULT_COUNT;
  }
}

async function readCount(): Promise<number | null> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/page_views?select=count&id=eq.${TABLE_ID}`, {
    headers: { ...headers, Accept: "application/vnd.pgrst.object+json" },
  });
  if (!res.ok) {
    console.warn("Visit count read failed:", res.status);
    return null;
  }
  const data = await res.json();
  return Number(data.count);
}

export { DEFAULT_COUNT as DEFAULT_VISIT_COUNT };
