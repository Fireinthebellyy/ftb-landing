import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../lib/db";

export async function POST(request: NextRequest) {
  try {
    if (!client) {
      return NextResponse.json(
        { message: "Database connection not available" },
        { status: 500 }
      );
    }

    const { email } = await request.json();

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Check if email already exists in waitlist
    const existingEntry = await client.query(
      "SELECT id FROM waitlist WHERE email = $1 LIMIT 1",
      [email]
    );

    if (existingEntry.rows.length > 0) {
      return NextResponse.json(
        { message: "This email is already on the waitlist!" },
        { status: 409 }
      );
    }

    // Insert new waitlist entry
    await client.query(
      "INSERT INTO waitlist (email, created_at) VALUES ($1, $2)",
      [email, new Date()]
    );

    return NextResponse.json(
      { message: "Successfully joined the waitlist!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
