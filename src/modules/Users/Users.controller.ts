import { UserService } from "./User.services";
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Route,
  Tags,
  Request,
  Query,
  Middlewares,
} from "tsoa";
import { User } from "./interface/Users.interface";
import { Request as ExpressRequest } from "express";
import { authMiddleware } from "../../middlewares/session";

interface RequestWithUser extends ExpressRequest {
  user?: User;
}

@Route("users")
@Tags("Users")
@Middlewares(authMiddleware())
export class UserController extends Controller {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Post()
  public async createUser(
    @Request() request: RequestWithUser,
    @Body() user: User
  ): Promise<User> {
    if (!request.user) {
      throw new Error("User not authenticated");
    }
    return await this.userService.createUser(user, request.user);
  }

  @Get("/get-user")
  public async getUser(
    @Request() request: RequestWithUser,
    @Query("id-number") idNumber: string
  ): Promise<User> {
    if (!request.user) {
      throw new Error("User not authenticated");
    }
    return await this.userService.getUser(idNumber, request.user);
  }

  @Put("/update-user")
  public async updateUser(
    @Request() request: RequestWithUser,
    @Query("id-number") idNumber: string,
    @Body() user: User
  ): Promise<User> {
    if (!request.user) {
      throw new Error("User not authenticated");
    }
    return await this.userService.updateUser(idNumber, user, request.user);
  }

  @Delete("/delete-user")
  public async deleteUser(
    @Request() request: RequestWithUser,
    @Query("id-number") idNumber: string
  ): Promise<boolean> {
    if (!request.user) {
      throw new Error("User not authenticated");
    }
    return await this.userService.deleteUser(idNumber, request.user);
  }

  @Get()
  public async getUsers(
    @Request() request: RequestWithUser,
    @Query() vaccinationStatus?: boolean,
    @Query() vaccineType?: string,
    @Query() vaccinationDateFrom?: Date,
    @Query() vaccinationDateTo?: Date
  ): Promise<User[]> {
    if (!request.user) {
      throw new Error("User not authenticated");
    }
    return await this.userService.getUsers(
      request.user,
      vaccinationStatus,
      vaccineType,
      vaccinationDateFrom,
      vaccinationDateTo
    );
  }
}
