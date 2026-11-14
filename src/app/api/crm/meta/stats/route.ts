import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { MetaStatsService } from "@/lib/crm/metaStatsService";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const requested = req.nextUrl.searchParams.get("days");
  const days = requested === "7" ? 7 : requested === "90" ? 90 : 30;

  const stats = await MetaStatsService.get(days);
  return NextResponse.json({ ok: true, stats });
}
