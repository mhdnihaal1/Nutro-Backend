import mongoose, { Schema, Document, Model, Types } from "mongoose";
import IOrder from "../../domainLayer/orderDomain";
import IOrderItem from "../../domainLayer/orderItemDomain";
import IAddres from "../../domainLayer/orderAdressDomain";

const orderItemSchema: Schema<IOrderItem> = new Schema({
  clothItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClothItem",
    required: true,
  },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  service: {
    type: String,
    enum: ["wash", "dryClean", "iron"],
    required: true,
  },
  unitPrice: { type: Number, required: true },
});

const addressSchema: Schema<IAddres> = new Schema({
  nearBy: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const orderSchema: Schema<IOrder> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clothItems: [orderItemSchema],
    addres: [addressSchema],
    status: {
      type: String,
      enum: [
        "orderPlaced",
        "orderConfirmed",
        "agentAccepted",
        "readyForPickup",
        "itemOnLaundry",
        "itemPacked",
        "outForDelivery",
        "delivered",
        "cancelled",
      ],
      default: "orderPlaced",
    },
    totalPrice: { type: Number, required: true },
    deliveryMode: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
