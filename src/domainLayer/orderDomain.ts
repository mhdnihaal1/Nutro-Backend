import mongoose from "mongoose";
import IOrderItem from "./orderItemDomain"; 
import IAddres from "./orderAdressDomain"; 

interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  clothItems: IOrderItem[]; 
  addres: IAddres[]; 
  status: "orderPlaced" | "orderConfirmed" | "agentAccepted" | "readyForPickup" | "itemOnLaundry" | "itemPacked" | "outForDelivery" | "delivered" | "cancelled";
  totalPrice: number;
  deliveryMode: string;
  paymentMethod: string;
  agentId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  }

  export default IOrder;
