import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import FAQ from "@/models/faq";
import { requireAdmin } from "@/app/api/_utils/requireAdmin";

export async function GET() {
  try {
    await connectDB();
    const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 });
    const transformedFaqs = faqs.map((faq) => ({
      id: faq._id.toString(),
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
    }));

    return NextResponse.json(transformedFaqs);
  } catch (error) {
    console.error("FAQ fetch error:", error);
    return NextResponse.json({ error: "Failed to load FAQs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    const body = await request.json();
    const faq = new FAQ(body);
    await faq.save();

    return NextResponse.json(
      {
        id: faq._id.toString(),
        question: faq.question,
        answer: faq.answer,
        order: faq.order,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("FAQ create error:", error);
    return NextResponse.json({ error: "Failed to add FAQ" }, { status: 500 });
  }
}
