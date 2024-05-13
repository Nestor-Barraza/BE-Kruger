import { Employee } from "./interface/Employees.interface";
import { validateEmployee } from "./Employees.validation";
import { EmployeeEntity } from "./Employees.entity";

export class EmployeeService {
  private employeeEntity: EmployeeEntity;

  constructor() {
    this.employeeEntity = new EmployeeEntity();
  }

  public async createEmployee(employee: Employee): Promise<Employee> {
    const validationErrors = validateEmployee(employee);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(", "));
    }

    const existingEmployee = await this.employeeEntity.findByIDNumber(
      employee.IDNumber
    );
    if (existingEmployee) {
      throw new Error(
        "Employee with the same ID number already exists."
      );
    }

    const createdEmployee = await this.employeeEntity.create(employee);
    return createdEmployee;
  }

  public async getEmployee(
    IDNumber: string
  ): Promise<Employee> {
    const employee = await this.employeeEntity.findByIDNumber(IDNumber);
    if (!employee) {
      throw new Error(`Employee with ID number ${IDNumber} not found`);
    }
    return employee;
  }

  public async updateEmployee(
    IDNumber: string,
    employee: Employee
  ): Promise<Employee> {
    const validationErrors = validateEmployee(employee);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(", "));
    }

    const updatedEmployee = await this.employeeEntity.update(
      IDNumber,
      employee
    );

    if (!updatedEmployee) {
      throw new Error("Employee not found.");
    }

    return updatedEmployee;
  }

  public async deleteEmployee(IDNumber: string): Promise<void> {
    const deleted = await this.employeeEntity.deleteByIDNumber(IDNumber);

    if (!deleted) {
      throw new Error("Employee not found.");
    }
  }

  public async getEmployees(
    vaccinationStatus?: boolean,
    vaccineType?: string,
    vaccinationDateFrom?: Date,
    vaccinationDateTo?: Date
  ): Promise<Employee[]> {
    const filter: any = {};

    if (vaccinationStatus !== undefined) {
      filter.vaccinationStatus = vaccinationStatus;
    }

    if (vaccineType) {
      filter.vaccineType = vaccineType;
    }

    if (vaccinationDateFrom) {
      filter.vaccinationDate = { $gte: vaccinationDateFrom };
    }

    if (vaccinationDateTo) {
      if (filter.vaccinationDate) {
        filter.vaccinationDate.$lte = vaccinationDateTo;
      } else {
        filter.vaccinationDate = { $lte: vaccinationDateTo };
      }
    }

    const employees = await this.employeeEntity.find(filter);
    return employees;
  }
}
