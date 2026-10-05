import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

const DEFAULT_FALLBACK_COUNT = 12847;

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ count: DEFAULT_FALLBACK_COUNT, source: "fallback-no-client" });
    }

    const { data, error } = await supabase
      .from("page_views")
      .select("count")
      .eq("id", "total_visits")
      .single();

    if (error || !data) {
      console.error("Supabase GET page_views error:", error);
      return NextResponse.json({ count: DEFAULT_FALLBACK_COUNT, source: "fallback-error", error: error?.message });
    }

    return NextResponse.json({ count: Number(data.count), source: "supabase" });
  } catch (error) {
    console.error("Supabase visits GET exception:", error);
    return NextResponse.json({ count: DEFAULT_FALLBACK_COUNT, source: "fallback-exception" });
  }
}

export async function POST() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ count: DEFAULT_FALLBACK_COUNT, source: "fallback-no-client" });
    }

    // Try calling SQL stored procedure 'increment_visits' first
    const { data: rpcData, error: rpcError } = await supabase.rpc("increment_visits", {
      page_id: "total_visits",
    });

    if (!rpcError && (typeof rpcData === "number" || typeof rpcData === "string")) {
      return NextResponse.json({ count: Number(rpcData), source: "supabase" });
    }

    if (rpcError) {
      console.warn("Supabase RPC increment_visits failed, trying direct upsert:", rpcError.message);
    }

    // Fallback: direct table SELECT + UPSERT if RPC function is not created
    const { data: existing } = await supabase
      .from("page_views")
      .select("count")
      .eq("id", "total_visits")
      .single();

    const currentCount = existing?.count ? Number(existing.count) : DEFAULT_FALLBACK_COUNT;
    const newCount = currentCount + 1;

    const { error: upsertError } = await supabase
      .from("page_views")
      .upsert({ id: "total_visits", count: newCount, updated_at: new Date().toISOString() });

    if (upsertError) {
      console.error("Supabase visits upsert error:", upsertError);
      return NextResponse.json({ count: currentCount, source: "fallback-upsert-error", error: upsertError.message });
    }

    return NextResponse.json({ count: newCount, source: "supabase" });
  } catch (error) {
    console.error("Supabase visits POST exception:", error);
    return NextResponse.json({ count: DEFAULT_FALLBACK_COUNT, source: "fallback-exception" });
  }
}

