import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Product from "@/models/product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    const transformedProducts = products.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      category: p.category,
      description: p.description,
      image: p.image,
      specifications: p.specifications,
      applications: p.applications,
      features: p.features,
      createdAt: p.createdAt,
    }));
    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error("Products fetch error:", error);
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
    return NextResponse.json(
      {
        id: newProduct._id.toString(),
        name: newProduct.name,
        category: newProduct.category,
        description: newProduct.description,
        image: newProduct.image,
        specifications: newProduct.specifications,
        applications: newProduct.applications,
        features: newProduct.features,
        createdAt: newProduct.createdAt,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
