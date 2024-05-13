export interface Employee {
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
