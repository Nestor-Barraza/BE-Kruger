import { EmployeeService } from "./Employees.services";
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Query,
  Route,
  Tags,
  Response,
  SuccessResponse,
} from "tsoa";
import { Employee } from "./interface/Employees.interface";

@Route("employees")
@Tags("Employees")
export class EmployeeController extends Controller {
  private employeeService: EmployeeService;

  constructor() {
    super();
    this.employeeService = new EmployeeService();
  }

  @SuccessResponse("201", "Created")
  @Response<string>("400", "Bad Request")
  @Post()
  public async createEmployee(@Body() employee: Employee): Promise<Employee> {
    const createdEmployee = await this.employeeService.createEmployee(employee);
    this.setStatus(201);
    return createdEmployee;
  }

  @Response<string>("404", "Not Found")
  @Get("{IDNumber}")
  public async getEmployee(@Query("IDNumber") IDNumber: string): Promise<Employee> {
    return await this.employeeService.getEmployee(IDNumber);
  }

  @SuccessResponse("200", "OK")
  @Response<string>("400", "Bad Request")
  @Response<string>("404", "Not Found")
  @Put("{IDNumber}")
  public async updateEmployee(
    @Query("IDNumber") IDNumber: string,
    @Body() employee: Employee
  ): Promise<Employee> {
    return await this.employeeService.updateEmployee(IDNumber, employee);
  }

  @SuccessResponse("204", "No Content")
  @Response<string>("404", "Not Found")
  @Delete("{IDNumber}")
  public async deleteEmployee(@Query("IDNumber") IDNumber: string): Promise<void> {
    await this.employeeService.deleteEmployee(IDNumber);
    this.setStatus(204);
  }

  @Get()
  public async getEmployees(
    @Query("vaccinationStatus") vaccinationStatus?: boolean,
    @Query("vaccineType") vaccineType?: string,
    @Query("vaccinationDateFrom") vaccinationDateFrom?: Date,
    @Query("vaccinationDateTo") vaccinationDateTo?: Date
  ): Promise<Employee[]> {
    return await this.employeeService.getEmployees(
      vaccinationStatus,
      vaccineType,
      vaccinationDateFrom,
      vaccinationDateTo
    );
  }
}