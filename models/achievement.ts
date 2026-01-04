import mongoose, { Schema, Model, Document } from "mongoose";

export interface IAchievement extends Document {
  number: number;
  label: string;
  suffix: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const achievementSchema = new Schema<IAchievement>(
  {
    number: {
      type: Number,
      required: [true, "Please provide a number"],
    },
    label: {
      type: String,
      required: [true, "Please provide a label"],
    },
    suffix: {
      type: String,
      enum: ["+", "%"],
      default: "+",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Achievement: Model<IAchievement> =
  mongoose.models.Achievement ||
  mongoose.model("Achievement", achievementSchema);

export default Achievement;
