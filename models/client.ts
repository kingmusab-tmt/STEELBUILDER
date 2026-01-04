import mongoose, { Schema, Model, Document } from "mongoose";

export interface IClient extends Document {
  name: string;
  logo: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const clientSchema = new Schema<IClient>(
  {
    name: {
      type: String,
      required: [true, "Please provide a company name"],
    },
    logo: {
      type: String,
      required: [true, "Please provide a logo URL"],
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

const Client: Model<IClient> =
  mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;
