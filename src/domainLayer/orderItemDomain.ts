import mongoose from "mongoose";

interface IOrderItem {
  clothItemId: mongoose.Schema.Types.ObjectId;
  name: string;
  category: string;
  quantity: number;
  service: "wash" | "dryClean" | "iron";
  unitPrice: number;
}

export default IOrderItem;
