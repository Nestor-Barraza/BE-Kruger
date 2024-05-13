import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  password: string;
  role: "admin" | "employee";
  employee?: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

export default mongoose.model<UserDocument>("User", UserSchema);