import { createClient } from "@supabase/supabase-js";

// The project URL and publishable key are public by design (they ship to every visitor's browser; access is
// governed by row-level security, not by keeping these secret). They are used as a fallback so the visitor
// counter still works when the hosting build doesn't provide NEXT_PUBLIC_SUPABASE_* env vars.
const FALLBACK_SUPABASE_URL = "https://xurrtlatvgtatmvhosxi.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_eryZwmklCrOHqiHbTj6FCA_3eXSfUrB";

export function getSupabaseClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    FALLBACK_SUPABASE_URL;

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    FALLBACK_SUPABASE_PUBLISHABLE_KEY;

  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = getSupabaseClient();
