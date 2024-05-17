import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import constants from "../utils/constants";
import { User } from "modules/Users/interface/Users.interface";

interface RequestWithUser extends Request {
  user?: User;
}

export function authMiddleware() {
  return async function (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const token = request.header("Authorization");
    if (!token) {
      response.status(401).json({ error: "No token provided" });
      return;
    }

    try {
      const cleanedToken = token.replace("Bearer ", "");
      const decoded = jwt.verify(
        cleanedToken,
        constants.JWT_SECRET
      ) as JwtPayload;

      if (
        typeof decoded === "object" &&
        decoded !== null &&
        "user" in decoded
      ) {
        request.user = decoded.user as User;
      }

      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        response.status(401).json({ error: "Token expired" });
      } else if (err instanceof jwt.JsonWebTokenError) {
        response.status(401).json({ error: "Invalid token" });
      } else {
        console.error("Error:", err);
        response.status(500).json({ error: "Internal server error" });
      }
    }
  };
}
