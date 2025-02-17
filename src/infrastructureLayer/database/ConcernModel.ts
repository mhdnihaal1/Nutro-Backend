import mongoose, { Schema, Document, Model } from "mongoose";
import IConcern from "../../domainLayer/concernDomain";

const concernSchema: Schema<IConcern | Document> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: { type: String, required: true },
    summary: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Concern: Model<IConcern | Document> = mongoose.model<IConcern | Document>(
  "Concern",
  concernSchema
);

export default Concern;
