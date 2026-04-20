import { VALIDATION_RULES } from '../constants/app.config';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const isValidEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL_PATTERN.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};

export const isValidName = (name: string): boolean => {
  return !!name && name.trim().length >= VALIDATION_RULES.NAME_MIN_LENGTH;
};

export const validateEmployeeForm = (employeeData: any): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!employeeData.name || !employeeData.name.trim()) {
    errors['name'] = 'Name is required';
  }

  if (!employeeData.email || !isValidEmail(employeeData.email)) {
    errors['email'] = 'Valid email is required';
  }

  if (!employeeData.position || !employeeData.position.trim()) {
    errors['position'] = 'Position is required';
  }

  if (!employeeData.department || !employeeData.department.trim()) {
    errors['department'] = 'Department is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLoginForm = (loginData: any): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!loginData.email || !isValidEmail(loginData.email)) {
    errors['email'] = 'Valid email is required';
  }

  if (!loginData.password) {
    errors['password'] = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateRegistrationForm = (registrationData: any): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!registrationData.name || !isValidName(registrationData.name)) {
    errors['name'] = 'Name must be at least 2 characters';
  }

  if (!registrationData.email || !isValidEmail(registrationData.email)) {
    errors['email'] = 'Valid email is required';
  }

  if (!registrationData.password || !isValidPassword(registrationData.password)) {
    errors['password'] = `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
