import { Types } from "mongoose";

export interface User {
  username: string;
  password: string;
  role: "admin" | "employee";
  employee?: Types.ObjectId;
}