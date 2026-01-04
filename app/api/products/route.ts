import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Product from "@/models/product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const newProduct = new Product({
      name: body.name,
      category: body.category,
      description: body.description,
      image: body.image,
      specifications: body.specifications || [],
      applications: body.applications || [],
      features: body.features || [],
    });

    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
