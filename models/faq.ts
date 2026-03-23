import mongoose, { Schema, Model, Document } from "mongoose";

export interface IFAQ extends Document {
  question: string;
  answer: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const faqSchema = new Schema<IFAQ>(
  {
    question: {
      type: String,
      required: [true, "Please provide a question"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Please provide an answer"],
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const FAQ: Model<IFAQ> =
  mongoose.models.FAQ || mongoose.model("FAQ", faqSchema);

export default FAQ;
