import mongoose from "mongoose";

interface IAddres {
  _id: object;
  nearBy: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IAddres;
