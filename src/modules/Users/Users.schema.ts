import mongoose, { Document, Schema } from "mongoose";
import { User } from "./interface/Users.interface";
import bcrypt from "bcrypt";

export interface UserDocument extends Document, User {}

const UserSchema: Schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "employee"], required: true },
  IDNumber: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date },
  homeAddress: { type: String },
  mobilePhone: { type: String },
  vaccinationStatus: { type: Boolean, default: false },
  vaccineType: { type: String },
  vaccinationDate: { type: Date },
  numberOfDoses: { type: Number },
});

UserSchema.pre("save", function (next) {
  const user = this as unknown as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

export default mongoose.model<UserDocument>("User", UserSchema);
