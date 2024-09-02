import mongoose, { Document, Schema } from "mongoose";

interface IEmployee extends Document {
  name: string;
  email: string;
  position: string;
  hireDate: Date;
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  hireDate: { type: Date, required: true, default: Date.now },
});

const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);

export default Employee;
