import { Employee } from "./interface/Employees.interface";
import EmployeeModel from "./Employees.schema";

export class EmployeeEntity {
  public async create(employee: Employee): Promise<Employee> {
    const createdEmployee = await EmployeeModel.create(employee);
    return createdEmployee;
  }

  public async findByIDNumber(
    IDNumber: string
  ): Promise<Employee | null> {
    const employee = await EmployeeModel.findOne({ IDNumber });
    return employee;
  }

  public async update(
    IDNumber: string,
    employee: Employee
  ): Promise<Employee | null> {
    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
      { IDNumber },
      employee,
      { new: true }
    );
    return updatedEmployee;
  }

  public async deleteByIDNumber(IDNumber: string): Promise<boolean> {
    const result = await EmployeeModel.deleteOne({ IDNumber });
    return result.deletedCount > 0;
  }

  public async find(filter: any): Promise<Employee[]> {
    const employees = await EmployeeModel.find(filter);
    return employees;
  }
}
