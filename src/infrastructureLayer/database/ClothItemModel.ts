import mongoose, { Schema, Document, Model } from "mongoose";
import IClothItem from "../../domainLayer/ClothItemDomain";

const clothItemSchema: Schema<IClothItem | Document> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: [Number],
      required: true,
      trim: true,
    },
    prices: {
      dryClean: {
        type: Number,
        required: true,
      },
      wash: {
        type: Number,
        required: true,
      },
      iron: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const ClothItem: Model<IClothItem | Document> = mongoose.model<
  IClothItem | Document
>("ClothItem", clothItemSchema);

export default ClothItem;
