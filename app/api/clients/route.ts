import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Client from "@/models/client";

export async function GET() {
  try {
    await connectDB();
    const clients = await Client.find().sort({ order: 1 });
    return NextResponse.json(clients);
  } catch {
    return NextResponse.json(
      { error: "Failed to load clients" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const client = new Client({
      name: body.name,
      logo: body.logo,
      order: body.order || 0,
    });

    await client.save();
    return NextResponse.json(client, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to add client" },
      { status: 500 }
    );
  }
}
