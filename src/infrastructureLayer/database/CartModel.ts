import mongoose, { Schema, Document, Model } from "mongoose";
import ICartItem from "../../domainLayer/cartItemsDomain";
import ICart from "../../domainLayer/cartDomain";

const cartItemSchema: Schema<ICartItem | Document> = new Schema({
  clothItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClothItem",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  service: {
    type: String,
    enum: ["wash", "dryClean", "iron"],
    required: true,
  },
});

const cartSchema: Schema<ICart | Document> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

const Cart: Model<ICart | Document> = mongoose.model<ICart | Document>(
  "Cart",
  cartSchema
);

export default Cart;
