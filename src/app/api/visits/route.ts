import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const DEFAULT_FALLBACK_COUNT = 12847;

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ count: DEFAULT_FALLBACK_COUNT, source: "fallback" });
    }

    const { data, error } = await supabase
      .from("page_views")
      .select("count")
      .eq("id", "total_visits")
      .single();

    if (error || !data) {
      return NextResponse.json({ count: DEFAULT_FALLBACK_COUNT, source: "fallback" });
    }

    return NextResponse.json({ count: data.count, source: "supabase" });
  } catch (error) {
    console.error("Supabase visits GET error:", error);
    return NextResponse.json({ count: DEFAULT_FALLBACK_COUNT, source: "fallback" });
  }
}

export async function POST() {
  try {
    if (!supabase) {
      return NextResponse.json({ count: DEFAULT_FALLBACK_COUNT, source: "fallback" });
    }

    // Try calling SQL stored procedure 'increment_visits' first
    const { data: rpcData, error: rpcError } = await supabase.rpc("increment_visits", {
      page_id: "total_visits",
    });

    if (!rpcError && typeof rpcData === "number") {
      return NextResponse.json({ count: rpcData, source: "supabase" });
    }

    // Fallback: direct table SELECT + UPSERT if RPC function is not created
    const { data: existing } = await supabase
      .from("page_views")
      .select("count")
      .eq("id", "total_visits")
      .single();

    const currentCount = existing?.count ?? DEFAULT_FALLBACK_COUNT;
    const newCount = currentCount + 1;

    const { error: upsertError } = await supabase
      .from("page_views")
      .upsert({ id: "total_visits", count: newCount, updated_at: new Date().toISOString() });

    if (upsertError) {
      console.error("Supabase visits upsert error:", upsertError);
      return NextResponse.json({ count: currentCount, source: "fallback" });
    }

    return NextResponse.json({ count: newCount, source: "supabase" });
  } catch (error) {
    console.error("Supabase visits POST error:", error);
    return NextResponse.json({ count: DEFAULT_FALLBACK_COUNT, source: "fallback" });
  }
}
