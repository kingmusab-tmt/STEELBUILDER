import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Testimonial from "@/models/testimonial";

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find().sort({ order: 1 });
    const transformedTestimonials = testimonials.map((t) => ({
      id: t._id.toString(),
      name: t.name,
      company: t.company,
      message: t.message,
      rating: t.rating,
      image: t.image,
      order: t.order,
    }));
    return NextResponse.json(transformedTestimonials);
  } catch (error) {
    console.error("Testimonials fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const testimonial = new Testimonial(body);
    await testimonial.save();
    return NextResponse.json(
      {
        id: testimonial._id.toString(),
        name: testimonial.name,
        company: testimonial.company,
        message: testimonial.message,
        rating: testimonial.rating,
        image: testimonial.image,
        order: testimonial.order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Testimonial create error:", error);
    return NextResponse.json(
      { error: "Failed to add testimonial" },
      { status: 500 }
    );
  }
}
