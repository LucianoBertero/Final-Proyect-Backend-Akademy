import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: mongoose.Types.ObjectId;
}

export default IUser;
