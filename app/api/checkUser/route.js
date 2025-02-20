import { connectToDatabase } from "@/lib/mongodb";
import UserDetails from "@/models/UserDetails";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const user = await UserDetails.findOne({ email });

    return NextResponse.json({ user: user || null }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
