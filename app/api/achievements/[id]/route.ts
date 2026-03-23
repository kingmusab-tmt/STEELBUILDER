import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Achievement from "@/models/achievement";
import { Types } from "mongoose";
import { requireAdmin } from "@/app/api/_utils/requireAdmin";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid achievement ID" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const achievement = await Achievement.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!achievement) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 },
      );
    }
    const transformed = {
      id: achievement._id.toString(),
      number: achievement.number,
      label: achievement.label,
      suffix: achievement.suffix || "+",
      order: achievement.order,
    };
    return NextResponse.json(transformed);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update achievement" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid achievement ID" },
        { status: 400 },
      );
    }

    const achievement = await Achievement.findByIdAndDelete(id);

    if (!achievement) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Achievement deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete achievement" },
      { status: 500 },
    );
  }
}
