import mongoose from "mongoose";
import { DB_NAME } from "./constant";

const connectDB = async () => {
  try {
    const mongo_uri =
      process.env.MONGODB_URI ||
      "mongodb://localhost:27017/Nutro-Laundry-Service";

    if (mongo_uri) {
      await mongoose.connect(mongo_uri);
    }
  } catch (error) {
    const err: Error = error as Error;
    console.log("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

export { connectDB };
 