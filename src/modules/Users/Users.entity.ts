import { User } from "./interface/Users.interface";
import UserModel from "./Users.schema";

export class UserEntity {
  public async create(user: User): Promise<User> {
    const createdUser = await UserModel.create(user);
    return createdUser;
  }

  public async findByIDNumber(IDNumber: string): Promise<User | null> {
    const user = await UserModel.findOne({ IDNumber });
    return user;
  }

  public async findByField(field: string, value: string): Promise<User | null> {
    const query: { [key: string]: string } = {};
    query[field] = value;
    const user = await UserModel.findOne(query);
    return user;
  }

  public async update(IDNumber: string, user: User): Promise<User | null> {
    const updatedUser = await UserModel.findOneAndUpdate({ IDNumber }, user, {
      new: true,
    });
    return updatedUser;
  }

  public async delete(IDNumber: string): Promise<boolean> {
    const result = await UserModel.deleteOne({ IDNumber });
    return result.deletedCount > 0;
  }

  public async find(filter: any): Promise<User[]> {
    const users = await UserModel.find(filter);
    return users;
  }
}
