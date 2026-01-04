import mongoose, { Schema, Model, Document } from "mongoose";

export interface IHeroImage extends Document {
  url: string;
  title: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const heroImageSchema = new Schema<IHeroImage>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    url: {
      type: String,
      required: [true, "Please provide an image URL"],
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

const HeroImage: Model<IHeroImage> =
  mongoose.models.HeroImage || mongoose.model("HeroImage", heroImageSchema);

export default HeroImage;
