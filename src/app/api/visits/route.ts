import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ count: 12847 });
}

export async function POST(request: NextRequest) {
  const ip = request.ip || "unknown";
  
  return NextResponse.json({ count: 12848 });
}
