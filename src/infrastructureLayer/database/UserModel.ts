import mongoose, { Schema, Document, Model } from "mongoose";
import IUser from "../../domainLayer/userDomain";

const userSchema: Schema<IUser | Document> = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userStatus: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser | Document> = mongoose.model<IUser | Document>(
  "User",
  userSchema
);

export default User;
