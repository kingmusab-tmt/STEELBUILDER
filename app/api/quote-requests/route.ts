import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import mongoose, { Schema, Model, Document } from "mongoose";

interface IQuoteRequest extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  location: string;
  productCategory: string;
  productDescription: string;
  specifications?: string;
  quantity?: string;
  budget?: string;
  requirements: string[];
  customRequirements?: string;
  timeline?: string;
  additionalNotes?: string;
  submittedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const quoteRequestSchema = new Schema<IQuoteRequest>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
    },
    location: String,
    productCategory: {
      type: String,
      required: [true, "Product category is required"],
    },
    productDescription: {
      type: String,
      required: [true, "Product description is required"],
    },
    specifications: String,
    quantity: String,
    budget: String,
    requirements: [String],
    customRequirements: String,
    timeline: String,
    additionalNotes: String,
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const QuoteRequest: Model<IQuoteRequest> =
  mongoose.models.QuoteRequest ||
  mongoose.model("QuoteRequest", quoteRequestSchema);

export async function GET() {
  try {
    await connectDB();
    const requests = await QuoteRequest.find().sort({ submittedAt: -1 });
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load quote requests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const quoteRequest = new QuoteRequest(body);
    await quoteRequest.save();

    return NextResponse.json(quoteRequest, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save quote request" },
      { status: 500 }
    );
  }
}
