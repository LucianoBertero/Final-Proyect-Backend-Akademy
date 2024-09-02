import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: "Role", default: null },
});

UserSchema.method("toJSON", function (this: any) {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
