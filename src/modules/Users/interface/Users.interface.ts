export interface User {
  username: string;
  password: string;
  role: "admin" | "employee";
  IDNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: Date;
  homeAddress?: string;
  mobilePhone?: string;
  vaccinationStatus?: boolean;
  vaccineType?: string;
  vaccinationDate?: Date;
  numberOfDoses?: number;
}
