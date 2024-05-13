import mongoose, { Document, Schema } from "mongoose";
import { Employee } from "./interface/Employees.interface";

export interface EmployeeDocument extends Document, Employee {}

const EmployeeSchema: Schema = new mongoose.Schema({
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

export default mongoose.model<EmployeeDocument>("Employee", EmployeeSchema);