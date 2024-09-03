import mongoose, { Document, Schema, Types } from "mongoose";

interface IAssets extends Document {
  name: string;
  description: string;
  category: Types.ObjectId;
  assigned_employee?: Types.ObjectId | null; // Opcional y puede ser null
  assigned_date?: Date | null;
}

const AssetSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  assigned_employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    default: null,
  },
  assigned_date: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

const Asset = mongoose.model<IAssets>("Asset", AssetSchema);

export default Asset;
