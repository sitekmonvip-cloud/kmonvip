import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { DashboardService } from "@/lib/crm/dashboardService";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const days = req.nextUrl.searchParams.get("days") === "30" ? 30 : 7;

  const [cards, chart] = await Promise.all([
    DashboardService.getCardStats(),
    DashboardService.getChartSeries(days),
  ]);

  return NextResponse.json({ ok: true, cards, chart });
}
