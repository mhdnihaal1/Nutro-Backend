import mongoose from "mongoose";
import ICartItem from "./cartItemsDomain";

interface ICart {
  userId: mongoose.Schema.Types.ObjectId;
  items: ICartItem[];
}

export default ICart;
