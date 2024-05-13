import { Employee } from "./interface/Employees.interface";

export function validateEmployee(employee: Employee): string[] {
  const validationErrors: string[] = [];

  validateField(employee.IDNumber, "ID Number", validationErrors, {
    required: true,
    pattern: /^\d{10}$/,
    patternMessage: "must be a 10-digit number",
  });

  validateField(employee.firstName, "First Name", validationErrors, {
    required: true,
    pattern: /^[a-zA-Z\s]+$/,
    patternMessage: "must contain only letters and spaces",
  });

  validateField(employee.lastName, "Last Name", validationErrors, {
    required: true,
    pattern: /^[a-zA-Z\s]+$/,
    patternMessage: "must contain only letters and spaces",
  });

  validateField(employee.email, "Email", validationErrors, {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: "must be a valid email address",
  });

  validateField(employee.mobilePhone, "Mobile Phone", validationErrors, {
    pattern: /^\d{10}$/,
    patternMessage: "must be a 10-digit number",
  });

  validateType(employee.vaccinationStatus, "Vaccination Status", validationErrors, "boolean");
  validateType(employee.vaccineType, "Vaccine Type", validationErrors, "string");
  validateType(employee.numberOfDoses, "Number of Doses", validationErrors, "number");

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
  }
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