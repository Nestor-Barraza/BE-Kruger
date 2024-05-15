import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import constants from "../utils/constants";

interface TokenPayload {
  userId: string;
}

interface RequestWithUserId extends Request {
  userId?: string;
}

export function authMiddleware() {
  return function (
    request: RequestWithUserId,
    response: Response,
    next: NextFunction
  ): void {
    const token = request.headers["authorization"];

    if (!token) {
      response.status(401).json({ error: "No token provided" });
      return;
    }

    if (typeof token !== "string") {
      response.status(401).json({ error: "Invalid token format" });
      return;
    }

    jwt.verify(token, constants.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        response.status(401).json({ error: "Invalid token" });
        return;
      }

      const tokenPayload = decoded as TokenPayload;
      request.userId = tokenPayload.userId;
      next();
    });
  };
}
