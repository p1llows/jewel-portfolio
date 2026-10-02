import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ count: 12847 });
}

export async function POST() {
  return NextResponse.json({ count: 12848 });
}
