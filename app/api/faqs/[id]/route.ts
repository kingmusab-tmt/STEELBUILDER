import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import connectDB from "@/utils/connectDB";
import FAQ from "@/models/faq";
import { requireAdmin } from "@/app/api/_utils/requireAdmin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    await connectDB();

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid FAQ ID" }, { status: 400 });
    }

    const faq = await FAQ.findById(id);
    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: faq._id.toString(),
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch FAQ" }, { status: 500 });
  }
}

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
      return NextResponse.json({ error: "Invalid FAQ ID" }, { status: 400 });
    }

    const body = await request.json();
    const faq = await FAQ.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: faq._id.toString(),
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update FAQ" },
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
      return NextResponse.json({ error: "Invalid FAQ ID" }, { status: 400 });
    }

    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    console.error("FAQ delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 },
    );
  }
}
