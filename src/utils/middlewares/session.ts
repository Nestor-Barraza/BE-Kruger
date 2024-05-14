import { Request, Response, NextFunction } from "express";
import { User } from "modules/Users/interface/Users.interface";
import jwt from "jsonwebtoken";
import constants from "utils/constants";

interface RequestWithUser extends Request {
  user?: User;
}

export enum AuthenticatedEndpoint {
  CREATE_USER = "createUser",
  GET_USER = "getUser",
  GET_USERS = "getUsers",
  UPDATE_USER = "updateUser",
  DELETE_USER = "deleteUser",
}

export function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
): void {
  const endpoint = request.path.split("/").pop();

  if (
    Object.values(AuthenticatedEndpoint).includes(
      endpoint as AuthenticatedEndpoint
    )
  ) {
    const token = request.headers["authorization"];

    if (!token) {
      response.status(401).json({ error: "No token provided" });
      return;
    } else if (typeof token !== "string") {
      response.status(401).json({ error: "Invalid token format" });
      return;
    } else {
      jwt.verify(token, constants.JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
          response.status(401).json({ error: "Invalid token" });
          return;
        } else {
          request.user = decoded;
          next();
        }
      });
    }
  } else {
    next();
  }
}
