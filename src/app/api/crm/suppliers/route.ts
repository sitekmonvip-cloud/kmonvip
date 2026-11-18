import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { SupplierService } from "@/lib/crm/supplierService";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const { rows, total } = await SupplierService.list({
    search: params.get("search") ?? undefined,
    limit: Number(params.get("limit") ?? "50"),
    offset: Number(params.get("offset") ?? "0"),
  });

  return NextResponse.json({ ok: true, rows, total });
}
