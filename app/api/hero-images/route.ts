import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import HeroImage from "@/models/hero-image";

export async function GET() {
  try {
    await connectDB();
    const images = await HeroImage.find().sort({ order: 1 });
    return NextResponse.json(images);
  } catch {
    return NextResponse.json(
      { error: "Failed to load hero images" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const image = new HeroImage({
      title: body.title,
      url: body.url,
      order: body.order || 0,
    });

    await image.save();
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add hero image" },
      { status: 500 }
    );
  }
}
