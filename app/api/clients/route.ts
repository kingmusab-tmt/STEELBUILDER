import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Client from "@/models/client";

export async function GET() {
  try {
    await connectDB();
    const clients = await Client.find().sort({ order: 1 });
    const transformedClients = clients.map((c) => ({
      id: c._id.toString(),
      name: c.name,
      logo: c.logo,
      order: c.order,
    }));
    return NextResponse.json(transformedClients);
  } catch (error) {
    console.error("Clients fetch error:", error);
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
    return NextResponse.json(
      {
        id: client._id.toString(),
        name: client.name,
        logo: client.logo,
        order: client.order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Client create error:", error);
    return NextResponse.json(
      { error: "Failed to add client" },
      { status: 500 }
    );
  }
}
