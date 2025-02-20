import mongoose, { Model, Schema, Document } from "mongoose";
import Otp from "../../domainLayer/otp";

const otpSchema: Schema = new Schema<Otp>({
  name: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  password: { type: String },
  otp: { type: Number, required: true },
  otpGeneratedAt: { type: Date, required: true },
});

const OtpModel: Model<Otp | Document> = mongoose.model<Otp & Document>(
  "Otp",
  otpSchema
);

export default OtpModel;
