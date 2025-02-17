import mongoose from "mongoose";

interface IAddress {
  city: string;
  userId: mongoose.Schema.Types.ObjectId;
  addresses: {
    _id: object;
    nearBy: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    createdAt?: Date;
    updatedAt?: Date;
  }[];
}

export default IAddress;
