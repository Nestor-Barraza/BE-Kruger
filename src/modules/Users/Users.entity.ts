import { User } from "./interface/Users.interface";
import UserModel from "./Users.schema";

export class UserEntity {
  public async create(user: User): Promise<User> {
    const createdUser = await UserModel.create(user);
    return createdUser;
  }
}