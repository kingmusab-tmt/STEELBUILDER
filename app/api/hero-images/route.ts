import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import HeroImage from "@/models/hero-image";

export async function GET() {
  try {
    await connectDB();
    const images = await HeroImage.find().sort({ order: 1 });
    const transformedImages = images.map((img) => ({
      id: img._id.toString(),
      title: img.title,
      url: img.url,
      order: img.order,
    }));
    return NextResponse.json(transformedImages);
  } catch (error) {
    console.error("Hero images fetch error:", error);
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
    return NextResponse.json(
      {
        id: image._id.toString(),
        title: image.title,
        url: image.url,
        order: image.order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Hero image create error:", error);
    return NextResponse.json(
      { error: "Failed to add hero image" },
      { status: 500 }
    );
  }
}
