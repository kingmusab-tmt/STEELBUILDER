import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import HeroImage from "@/models/hero-image";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const image = await HeroImage.findById(id);
    if (!image) {
      return NextResponse.json(
        { error: "Hero image not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(image);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch hero image" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const body = await request.json();
    const image = await HeroImage.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!image) {
      return NextResponse.json(
        { error: "Hero image not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(image);
  } catch {
    return NextResponse.json(
      { error: "Failed to update hero image" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const image = await HeroImage.findByIdAndDelete(id);
    if (!image) {
      return NextResponse.json(
        { error: "Hero image not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete hero image" },
      { status: 500 }
    );
  }
}
