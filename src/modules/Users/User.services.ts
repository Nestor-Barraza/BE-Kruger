import { User } from "./interface/Users.interface";
import { Service } from "./types";
import UserModel from "./Users.schema";
import { roleValidator, validateUser } from "./Users.validations";

export interface ServiceError extends Error {
  message: string;
}

export class UserService {
  public async createUser(user: User, currentUser: User): Promise<User> {
    try {
      roleValidator(currentUser, Service.CREATE_USER);

      const validationErrors = validateUser(user);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
      }

      const createdUser = await UserModel.create(user);
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
      const user = await UserModel.findOne({ IDNumber });
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

      const updatedUser = await UserModel.findOneAndUpdate({ IDNumber }, user, {
        new: true,
      });
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
      const result = await UserModel.deleteOne({ IDNumber });
      return result.deletedCount > 0;
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
      const users = await UserModel.find(filter);
      return users;
    } catch (error) {
      throw new Error(
        `Failed to get users: ${(error as ServiceError).message}`
      );
    }
  }
}
