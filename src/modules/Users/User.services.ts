import { User } from "./interface/Users.interface";
import { UserEntity } from "./Users.entity";

export class UserService {
  private userEntity: UserEntity;

  constructor() {
    this.userEntity = new UserEntity();
  }

  public async createUser(user: User): Promise<User> {
    return await this.userEntity.create(user);
  }
}