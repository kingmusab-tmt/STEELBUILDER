import { NextRequest, NextResponse } from "next/server";
import { updateHeroImage, deleteHeroImage } from "@/app/lib/hero-images-db";

export async function GET() {
  return NextResponse.json({ success: true });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const body = await request.json();
    const image = updateHeroImage(id, body);
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
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deleted = deleteHeroImage(id);
    if (!deleted) {
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
