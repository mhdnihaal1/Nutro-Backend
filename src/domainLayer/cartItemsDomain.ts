import mongoose from "mongoose";

interface ICartItem {
  id: any;
  clothItemId: mongoose.Schema.Types.ObjectId; 
  quantity: number; 
  service: "Wash" | "DryClean" | "Ironing"; 
}

export default ICartItem;
