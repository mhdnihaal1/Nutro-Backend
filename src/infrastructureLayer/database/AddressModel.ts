import mongoose, { Schema, Document, Model } from "mongoose";
import IAddress from "../../domainLayer/addressDomain";

const addressSchema: Schema<IAddress | Document> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addresses: [
      {
        nearBy: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Address: Model<IAddress | Document> = mongoose.model<IAddress | Document>(
  "Address",
  addressSchema
);

export default Address;
