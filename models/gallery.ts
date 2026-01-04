import mongoose, { Schema, Model, Document } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  image: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const gallerySchema = new Schema<IGalleryItem>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    image: {
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

const Gallery: Model<IGalleryItem> =
  mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

export default Gallery;
