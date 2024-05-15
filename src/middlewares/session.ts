import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import constants from "../utils/constants";

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

    jwt.verify(
      token,
      constants.JWT_SECRET,
      (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            response.status(401).json({ error: "Token expired" });
          } else {
            response.status(401).json({ error: "Invalid token" });
          }
          return;
        }

        if (
          typeof decoded === "object" &&
          decoded !== null &&
          "userId" in decoded
        ) {
          request.userId = decoded.userId;
        }
        next();
      }
    );
  };
}
