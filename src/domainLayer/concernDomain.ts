import mongoose from "mongoose";

interface IConcern {
  userId: mongoose.Schema.Types.ObjectId;
  subject: string;
  summary: string;
}

export default IConcern;
