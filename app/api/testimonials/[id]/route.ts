import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Testimonial from "@/models/testimonial";
import { Types } from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid testimonial ID" },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      id: testimonial._id.toString(),
      name: testimonial.name,
      company: testimonial.company,
      message: testimonial.message,
      rating: testimonial.rating,
      image: testimonial.image,
      order: testimonial.order,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch testimonial" },
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

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid testimonial ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const testimonial = await Testimonial.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!testimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      id: testimonial._id.toString(),
      name: testimonial.name,
      company: testimonial.company,
      message: testimonial.message,
      rating: testimonial.rating,
      image: testimonial.image,
      order: testimonial.order,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update testimonial" },
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

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid testimonial ID" },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Testimonial delete error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete testimonial",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
