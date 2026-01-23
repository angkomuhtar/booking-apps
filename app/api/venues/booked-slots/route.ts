import { getBookedSlots } from "@/lib/data/venue";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const courtIds = searchParams.get("courtIds")?.split(",") || [];
  const date = searchParams.get("date") || "";

  if (courtIds.length === 0 || !date) {
    return NextResponse.json([]);
  }

  const bookedSlots = await getBookedSlots(courtIds, date);
  return NextResponse.json(bookedSlots);
}
