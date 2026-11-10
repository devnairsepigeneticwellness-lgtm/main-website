import { NextRequest, NextResponse } from "next/server";
import { getAvailableTimeSlots } from "@/lib/bookings/availability";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dateStr = searchParams.get("date");
  const professionalId = searchParams.get("professional_id") || undefined;

  if (!dateStr) {
    return NextResponse.json(
      { error: "Date parameter (YYYY-MM-DD) is required" },
      { status: 400 }
    );
  }

  try {
    const slots = await getAvailableTimeSlots(dateStr, professionalId);
    return NextResponse.json({ slots });
  } catch (err: any) {
    console.error("Error generating slots:", err);
    return NextResponse.json(
      { error: "Failed to generate slots", details: err?.message },
      { status: 500 }
    );
  }
}
