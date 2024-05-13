import dotenv from "dotenv";
dotenv.config();

export default {
  CLUSTER_URL: process.env.CLUSTER_URL ?? '',
  
  //JWT PROPS
  JWT_SIGNATURE: process.env.JWT_SIGNATURE,
  
  //Email Validation
  REGEX_EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  
  //Password Validation
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
  
  //Phone Validation
  PHONE_REGEX: /^(\+)?[1-9]\d{8,13}$/,
  
  //AWS Credentials
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  REGION: process.env.REGION,
  EMAIL_VERIFIED: process.env.EMAIL_VERIFIED,
  
  PDF_PROPS: {
    fontFamily: "Helvetica-Bold",
    colWidths: [120, 50, 120],
    rowHeight: 30,
    cellPadding: 10,
    tableTop: 200,
    tableLeft: 612 / 2 - 250,
    headerTextColor: "#000",
    evenRowBackgroundColor: "#f8f8f8",
    oddRowBackgroundColor: "#ffffff",
  },
};