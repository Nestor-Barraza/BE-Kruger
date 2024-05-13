import mongoose from "mongoose";
import constants from "../utils/constants";
import "colors";

export default async function databaseConnect() {
  try {
    await mongoose.connect(constants.CLUSTER_URL);
    console.log("Successful database connection".white, "Mr.Robot".red);
  } catch (error) {
    console.log(error);
  }
}