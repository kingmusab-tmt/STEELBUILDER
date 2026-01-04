import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid quote request ID" },
        { status: 400 }
      );
    }

    // Use the existing model if available, otherwise create a reference
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const result = await db.collection("quoterequests").deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Quote request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Quote request deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete quote request" },
      { status: 500 }
    );
  }
}
