/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Story from "@/models/Story";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const story = await Story.findById(id).populate("author", "name profilePic email");

    if (!story) {
      return NextResponse.json(
        { error: "Story not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ story });
  } catch (error: any) {
    console.error("Error fetching story details:", error);
    return NextResponse.json(
      { error: "Failed to fetch story details" },
      { status: 500 }
    );
  }
}
