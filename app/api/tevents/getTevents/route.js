import { connectToDatabase } from "@/lib/mongodb";
import { NTEvent } from "@/models/EventDetails";
import { TEvent } from "@/models/EventDetails";
import { NextResponse } from "next/server";

// tevents/getTevents/route.js
export const dynamic = 'force-dynamic'; // Force dynamic rendering

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    let event;
    if (eventId) {
      event = await TEvent.findOne({ eventid: parseInt(eventId) });
      if (!event) {
        console.log("Event not found for eventId:", eventId);
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      console.log("Event not found for eventId:", eventId);
      return NextResponse.json({ event }, { status: 200 });
    } else {
      event = await TEvent.find({})
        .select(
          "eventid name dept short_desc outer_Img time date fees limit availability"
        )
        .sort({ date: 1 });
      return NextResponse.json({ events: event }, { status: 200 });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
