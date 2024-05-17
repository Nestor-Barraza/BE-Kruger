import { Request, Response, NextFunction } from "express";
import constants from "../utils/constants";

export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin;
  if (constants.ALLOWED_ORIGINS === "*") {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else {
    const origins = constants.ALLOWED_ORIGINS.split(",");
    if (origins.includes(origin as string)) {
      res.setHeader("Access-Control-Allow-Origin", origin as string);
    }
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};
