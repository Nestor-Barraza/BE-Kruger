import dotenv from "dotenv";
import { getExpiresInHours, getExpiresInMinutes } from "utils";

dotenv.config();

const jwtInHours = getExpiresInHours(process.env.JWT_EXPIRES_IN ?? "");
const jwtInMinutes = getExpiresInMinutes(process.env.JWT_EXPIRES_IN ?? "");

export default {
  //== MONGO DB
  CLUSTER_URL: process.env.CLUSTER_URL ?? "",
  //== JWT
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  JWT_EXPIRES_IN_HOURS: jwtInHours,
  JWT_EXPIRES_IN_MINUTES: jwtInMinutes,
};
