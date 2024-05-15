import { User } from "./interface/Users.interface";
import { Service } from "./types";
import { roleValidator, validateUser } from "./Users.validations";
import { UserEntity } from "./Users.entity";

export interface ServiceError extends Error {
  message: string;
}

export class UserService {
  private userEntity: UserEntity;

  constructor() {
    this.userEntity = new UserEntity();
  }

  public async createUser(user: User, currentUser: User): Promise<User> {
    try {
      roleValidator(currentUser, Service.CREATE_USER);
      const validationErrors = validateUser(user);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
      }
      const createdUser = await this.userEntity.create(user);
      return createdUser;
    } catch (error) {
      throw new Error(
        `Failed to create user: ${(error as ServiceError).message}`
      );
    }
  }

  public async getUser(IDNumber: string, currentUser: User): Promise<User> {
    try {
      roleValidator(currentUser, Service.GET_USER);
      const user = await this.userEntity.findByIDNumber(IDNumber);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(`Failed to get user: ${(error as ServiceError).message}`);
    }
  }

  public async getUserByField(field: string, value: string): Promise<User> {
    try {
      const user = await this.userEntity.findByField(field, value);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(`Failed to get user: ${(error as ServiceError).message}`);
    }
  }

  public async updateUser(
    IDNumber: string,
    user: User,
    currentUser: User
  ): Promise<User> {
    try {
      roleValidator(currentUser, Service.UPDATE_USER);
      const validationErrors = validateUser(user);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
      }
      const updatedUser = await this.userEntity.update(IDNumber, user);
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    } catch (error) {
      throw new Error(
        `Failed to update user: ${(error as ServiceError).message}`
      );
    }
  }

  public async deleteUser(
    IDNumber: string,
    currentUser: User
  ): Promise<boolean> {
    try {
      roleValidator(currentUser, Service.DELETE_USER);
      const result = await this.userEntity.delete(IDNumber);
      return result;
    } catch (error) {
      throw new Error(
        `Failed to delete user: ${(error as ServiceError).message}`
      );
    }
  }

  public async getUsers(
    currentUser: User,
    vaccinationStatus?: boolean,
    vaccineType?: string,
    vaccinationDateFrom?: Date,
    vaccinationDateTo?: Date
  ): Promise<User[]> {
    try {
      roleValidator(currentUser, Service.GET_USERS);
      const filter: any = {};
      if (vaccinationStatus !== undefined) {
        filter.vaccinationStatus = vaccinationStatus;
      }
      if (vaccineType) {
        filter.vaccineType = vaccineType;
      }
      if (vaccinationDateFrom && vaccinationDateTo) {
        filter.vaccinationDate = {
          $gte: vaccinationDateFrom,
          $lte: vaccinationDateTo,
        };
      }
      const users = await this.userEntity.find(filter);
      return users;
    } catch (error) {
      throw new Error(
        `Failed to get users: ${(error as ServiceError).message}`
      );
    }
  }
}
