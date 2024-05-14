import { User } from "./interface/Users.interface";
import { Role, Service } from "./types";

export function roleValidator(currentUser: User, service: Service) {
  const allowedServices: { [key in Role]: Service[] } = {
    [Role.ADMIN]: [
      Service.CREATE_USER,
      Service.GET_USER,
      Service.UPDATE_USER,
      Service.DELETE_USER,
      Service.GET_USERS,
    ],
    [Role.EMPLOYEE]: [Service.GET_USER, Service.UPDATE_USER],
  };

  if (!allowedServices[currentUser.role].includes(service)) {
    throw new Error("You do not have permission to access this service.");
  }
}

export function validateUser(user: User): string[] {
  const validationErrors: string[] = [];

  validateField(user.username, "Username", validationErrors, {
    required: true,
  });

  validateField(user.password, "Password", validationErrors, {
    required: true,
  });

  validateField(user.role, "Role", validationErrors, {
    required: true,
    pattern: /^(admin|employee)$/,
    patternMessage: "must be either 'admin' or 'employee'",
  });

  validateField(user.IDNumber, "ID Number", validationErrors, {
    required: true,
    pattern: /^\d{10}$/,
    patternMessage: "must be a 10-digit number",
  });

  validateField(user.firstName, "First Name", validationErrors, {
    required: true,
    pattern: /^[a-zA-Z\s]+$/,
    patternMessage: "must contain only letters and spaces",
  });

  validateField(user.lastName, "Last Name", validationErrors, {
    required: true,
    pattern: /^[a-zA-Z\s]+$/,
    patternMessage: "must contain only letters and spaces",
  });

  validateField(user.email, "Email", validationErrors, {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: "must be a valid email address",
  });

  validateField(user.homeAddress, "Home Address", validationErrors);

  validateField(user.mobilePhone, "Mobile Phone", validationErrors, {
    pattern: /^\d{10}$/,
    patternMessage: "must be a 10-digit number",
  });

  validateType(
    user.vaccinationStatus,
    "Vaccination Status",
    validationErrors,
    "boolean"
  );
  validateType(user.vaccineType, "Vaccine Type", validationErrors, "string");
  validateType(
    user.numberOfDoses,
    "Number of Doses",
    validationErrors,
    "number"
  );

  return validationErrors;
}

function validateField(
  field: string | undefined,
  fieldName: string,
  validationErrors: string[],
  options: {
    required?: boolean;
    pattern?: RegExp;
    patternMessage?: string;
  } = {}
) {
  if (options.required && !field) {
    validationErrors.push(`${fieldName} is required.`);
  } else if (field && options.pattern && !options.pattern.test(field)) {
    validationErrors.push(`${fieldName} ${options.patternMessage}.`);
  }
}

function validateType(
  field: unknown,
  fieldName: string,
  validationErrors: string[],
  expectedType: string
) {
  if (field !== undefined && typeof field !== expectedType) {
    validationErrors.push(`${fieldName} must be a ${expectedType}.`);
  }
}
