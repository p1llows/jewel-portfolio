const DEFAULT_COUNT = 12847;
const TABLE_ID = "total_visits";

/**
 * Visitor counter, run in the browser.
 * The site is a static export (no server), so the old /api/visits route could never run in production.
 * supabase-js is imported lazily so it stays out of the initial bundle.
 *
 * Returns the current total; `increment` records a new visit (call once per session).
 * Never throws: falls back to the last known/default number.
 */
export async function getVisitCount(increment: boolean): Promise<number> {
  try {
    const { getSupabaseClient } = await import("@/lib/supabase");
    const supabase = getSupabaseClient();
    if (!supabase) return DEFAULT_COUNT;

    if (increment) {
      // Preferred: atomic SQL function
      const { data: rpcData, error: rpcError } = await supabase.rpc("increment_visits", {
        page_id: TABLE_ID,
      });
      if (!rpcError && (typeof rpcData === "number" || typeof rpcData === "string")) {
        return Number(rpcData);
      }
      if (rpcError) console.warn("increment_visits RPC failed, falling back to upsert:", rpcError.message);

      // Fallback: read + upsert (not atomic, only used if the SQL function is missing)
      const { data: existing } = await supabase
        .from("page_views")
        .select("count")
        .eq("id", TABLE_ID)
        .single();
      const next = (existing?.count ? Number(existing.count) : DEFAULT_COUNT) + 1;
      const { error: upsertError } = await supabase
        .from("page_views")
        .upsert({ id: TABLE_ID, count: next, updated_at: new Date().toISOString() });
      if (upsertError) {
        console.warn("Visit upsert failed:", upsertError.message);
        return next - 1;
      }
      return next;
    }

    const { data, error } = await supabase.from("page_views").select("count").eq("id", TABLE_ID).single();
    if (error || !data) {
      console.warn("Visit count read failed:", error?.message);
      return DEFAULT_COUNT;
    }
    return Number(data.count);
  } catch (err) {
    console.warn("Visit counter error:", err);
    return DEFAULT_COUNT;
  }
}

export { DEFAULT_COUNT as DEFAULT_VISIT_COUNT };
