import mongoose, { Schema, Document, Model } from "mongoose";
import IAdmin from "../../domainLayer/adminDomain";

const adminSchema: Schema<IAdmin | Document> = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Admin: Model<IAdmin | Document> = mongoose.model<IAdmin | Document>(
  "Admin",
  adminSchema
);

export default Admin;
