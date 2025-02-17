import mongoose, { Schema, Document, Model } from "mongoose";
import IOffer from "../../domainLayer/OfferDomain";

const offerSchema: Schema<IOffer | Document> = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Offer: Model<IOffer | Document> = mongoose.model<IOffer | Document>(
  "Offer",
  offerSchema
);

export default Offer;
