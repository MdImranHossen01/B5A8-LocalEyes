/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Story from "@/models/Story";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");

    const skip = (page - 1) * limit;

    const stories = await Story.find({ isActive: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name profilePic email");

    const total = await Story.countDocuments({ isActive: true });

    return NextResponse.json({
      stories,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { title, content, location, images } = await request.json();

    if (!title || !content || !location) {
      return NextResponse.json(
        { error: "Title, content, and location are required" },
        { status: 400 }
      );
    }

    const newStory = await Story.create({
      title,
      content,
      location,
      images: images && images.length > 0 ? images : ["/assets/package/sundarbans.webp"],
      author: token.id || (token as any).sub,
      authorName: token.name || "Traveler",
      authorImage: token.picture || "/profile.jpg",
      likes: 0,
      isActive: true,
    });

    return NextResponse.json({ story: newStory }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating story:", error);
    return NextResponse.json(
      { error: "Failed to create story" },
      { status: 500 }
    );
  }
}
