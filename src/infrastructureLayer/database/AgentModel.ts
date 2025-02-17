import mongoose, { Schema, Document, Model } from "mongoose";
import IAgent from "../../domainLayer/agentDomain";

const agentSchema: Schema<IAgent | Document> = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    agentStatus: { type: Boolean, default: false },
    map: { type: mongoose.Schema.Types.ObjectId, ref: "Map", required: false },
  },
  {
    timestamps: true,
  }
);

const Agent: Model<IAgent | Document> = mongoose.model<IAgent | Document>(
  "Agent",
  agentSchema
);

export default Agent;
