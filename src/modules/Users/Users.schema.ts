import mongoose, { Document, Schema } from "mongoose";
import { User } from "./interface/Users.interface";

export interface UserDocument extends Document, User {}

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
  IDNumber: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
  },
  homeAddress: {
    type: String,
  },
  mobilePhone: {
    type: String,
  },
  vaccinationStatus: {
    type: Boolean,
    default: false,
  },
  vaccineType: {
    type: String,
  },
  vaccinationDate: {
    type: Date,
  },
  numberOfDoses: {
    type: Number,
  },
});

export default mongoose.model<UserDocument>("User", UserSchema);