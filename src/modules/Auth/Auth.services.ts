import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "../Users/User.services";
import constants from "../../utils/constants";
import { User } from "modules/Users/interface/Users.interface";

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async login(credentials: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    const user = await this.userService.getUserByField(
      "email",
      credentials.email
    );

    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const userInfo: Partial<User> = {
      username: user.username,
      role: user.role,
      IDNumber: user.IDNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      homeAddress: user.homeAddress,
      mobilePhone: user.mobilePhone,
    };

    const token = jwt.sign({ user: userInfo }, constants.JWT_SECRET, {
      expiresIn: constants.JWT_EXPIRES_IN_HOURS,
    });

    return { token };
  }
}
