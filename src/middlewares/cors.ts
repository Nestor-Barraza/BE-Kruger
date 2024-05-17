import { Request, Response, NextFunction } from "express";

const allowedOrigins = process.env.ALLOWED_ORIGINS || "*";

export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin;
  if (allowedOrigins === "*") {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else {
    const origins = allowedOrigins.split(",");
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
