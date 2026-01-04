import mongoose, { Schema, Model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  description: string;
  image: string;
  specifications: string[];
  applications: string[];
  features: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      index: true,
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    image: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    specifications: {
      type: [String],
      default: [],
    },
    applications: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
