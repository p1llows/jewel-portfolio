import { NextResponse } from "next/server";
import { fetchGitHubContributions } from "@/lib/github";

export async function GET() {
  try {
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "p1llows";
    const data = await fetchGitHubContributions(username);

    if (!data.success && data.weeks.length === 0) {
      return NextResponse.json(
        { success: false, error: data.error || "Unable to load GitHub activity." },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GitHub contributions API route error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to load GitHub activity." },
      { status: 500 }
    );
  }
}
