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

  @Get("/get-user/:id-number")
  public async getUser(
    @Request() request: RequestWithUser,
    @Query("IDNumber") IDNumber: string
  ): Promise<User> {
    if (!request.user) {
      throw new Error("User not authenticated");
    }
    console.log(request.user);
    return await this.userService.getUser(IDNumber, request.user);
  }

  @Put("/update-user/:id-number")
  public async updateUser(
    @Request() request: RequestWithUser,
    @Query("IDNumber") IDNumber: string,
    @Body() user: User
  ): Promise<User> {
    if (!request.user) {
      throw new Error("User not authenticated");
    }
    return await this.userService.updateUser(IDNumber, user, request.user);
  }

  @Delete("/delete-user/:id-number")
  public async deleteUser(
    @Request() request: RequestWithUser,
    @Query("IDNumber") IDNumber: string
  ): Promise<boolean> {
    if (!request.user) {
      throw new Error("User not authenticated");
    }
    return await this.userService.deleteUser(IDNumber, request.user);
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
