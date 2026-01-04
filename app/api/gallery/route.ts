import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Gallery from "@/models/gallery";

export async function GET() {
  try {
    await connectDB();
    const gallery = await Gallery.find().sort({ order: -1, createdAt: -1 });
    return NextResponse.json(gallery);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const newItem = new Gallery({
      title: body.title,
      image: body.image,
      order: body.order || 0,
    });

    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}
