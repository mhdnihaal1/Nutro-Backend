import mongoose from "mongoose";
import { DB_NAME } from "./constant";

const connectDB = async () => {
  try {
    const mongo_uri =
      process.env.MONGODB_URI 
// "mongodb+srv://mhdnihal:12345@cluster1.jpsjsgj.mongodb.net/Nutro-App?retryWrites=true&w=majority&appName=Cluster1"
    if (mongo_uri) {
      await mongoose.connect(mongo_uri);
    }
  } catch (error) {
    const err: Error = error as Error;
    console.log("Error connecting to MongoDB :", err);
    process.exit(1);
  }
};

export { connectDB };
 