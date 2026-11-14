import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { EventService } from "@/lib/crm/eventService";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const limit = Number(req.nextUrl.searchParams.get("limit") ?? "25");
  const offset = Number(req.nextUrl.searchParams.get("offset") ?? "0");

  const params = req.nextUrl.searchParams;
  const type = params.get("type");

  const { rows, total } = await EventService.getPaginated(limit, offset, {
    search: params.get("search") ?? undefined,
    type: type && ["whatsapp_click", "form_submission", "phone_click"].includes(type) ? type : undefined,
    pendingPhone: params.get("pending") === "1",
  });
  return NextResponse.json({ ok: true, rows, total });
}
