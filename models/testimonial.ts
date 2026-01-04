import mongoose, { Schema, Model, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  company: string;
  message: string;
  rating: number;
  image: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    company: {
      type: String,
      required: [true, "Please provide a company"],
    },
    message: {
      type: String,
      required: [true, "Please provide a testimonial message"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: 1,
      max: 5,
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

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
