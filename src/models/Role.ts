import mongoose from "mongoose";
import { Schema, model } from "mongoose";

interface IRole extends Document {
  name: string;
  description: string;
}

const RoleSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export const Role = mongoose.model<IRole>("Role", RoleSchema);
