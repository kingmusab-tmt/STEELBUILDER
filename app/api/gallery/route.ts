import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Gallery from "@/models/gallery";

export async function GET() {
  try {
    await connectDB();
    const gallery = await Gallery.find().sort({ order: -1, createdAt: -1 });
    const transformedGallery = gallery.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      image: item.image,
      order: item.order,
      createdAt: item.createdAt,
    }));
    return NextResponse.json(transformedGallery);
  } catch (error) {
    console.error("Gallery fetch error:", error);
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
    return NextResponse.json(
      {
        id: newItem._id.toString(),
        title: newItem.title,
        image: newItem.image,
        order: newItem.order,
        createdAt: newItem.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Gallery create error:", error);
    return NextResponse.json(
      { error: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}
