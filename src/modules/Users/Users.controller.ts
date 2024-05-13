import { UserService } from "./User.services";
import { Controller, Post, Body, Route, Tags } from "tsoa";
import { User } from "./interface/Users.interface";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Post()
  public async createUser(@Body() user: User): Promise<User> {
    return await this.userService.createUser(user);
  }
}