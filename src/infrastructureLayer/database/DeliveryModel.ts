import mongoose, { Schema, Document, Model } from "mongoose";
import IDeliveryMode from "../../domainLayer/deliveryModeDomain";

const deliverySchema: Schema<IDeliveryMode | Document> = new Schema({
  mode: {
    type: String,
    required: true,
    enum: ["default", "express"],
    default: "default",
  },
  rate: {
    type: Number,
    required: true,
  },
});

const DeliveryMode: Model<IDeliveryMode | Document> = mongoose.model<
  IDeliveryMode | Document
>("DeliveryMode", deliverySchema);

export default DeliveryMode;
