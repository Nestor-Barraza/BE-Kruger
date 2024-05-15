// auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "../Users/User.services";
import constants from "utils/constants";

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async login(credentials: {
    username: string;
    password: string;
  }): Promise<string> {
    const user = await this.userService.getUserByField(
      "username",
      credentials.username
    );

    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.IDNumber }, constants.JWT_SECRET, {
      expiresIn: constants.JWT_EXPIRES_IN_HOURS,
    });

    return token;
  }
}
