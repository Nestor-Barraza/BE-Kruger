import dotenv from "dotenv";
dotenv.config();

export default {
  CLUSTER_URL: process.env.CLUSTER_URL ?? '',
  
  //JWT PROPS
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  

};