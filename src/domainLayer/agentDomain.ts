import mongoose, { Schema, Document, Model } from "mongoose";

interface IAgent {
  [x: string]: any;
  _id: object;
  name: string;
  phone: number;
  email: string;
  password: string;
  agentStatus: boolean;
  map: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export default IAgent;
