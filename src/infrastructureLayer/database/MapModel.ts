import mongoose, { Schema, Document, Model } from "mongoose";
import IMap from "../../domainLayer/mapDomain";

const mapSchema: Schema<IMap | Document> = new Schema(
  {
    sl_no: { type: Number, required: true },
    place: { type: String, required: true },
    pincode: { type: Number, required: true },
    latitude_longitude: { type: [Number], required: false },
  },
  {
    timestamps: true,
  }
);

const Map: Model<IMap | Document> = mongoose.model<IMap | Document>(
  "Map",
  mapSchema
);

export default Map;
