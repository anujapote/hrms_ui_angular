// Application configuration constants
export const APP_NAME = 'HRMS';
export const APP_TAGLINE = 'Manage your human resources efficiently';

// Leave types
export const LEAVE_TYPES = ['Annual', 'Sick', 'Other'];

// Default leave balance
export const DEFAULT_LEAVE_BALANCE = 20;

// Timeframe for new employees (days)
export const NEW_EMPLOYEE_TIMEFRAME_DAYS = 30;

// Storage keys (Keeping for local cache, but API will be used)
export const STORAGE_KEYS = {
  USERS: 'users',
  EMPLOYEES: 'employees',
  LEAVE_REQUESTS: 'leaveRequests',
  ATTENDANCE: 'attendance',
  CURRENT_USER: 'currentUser',
};

// Form field validation
export const VALIDATION_RULES = {
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
};

// Notification messages
export const MESSAGES = {
  // Auth
  USER_ALREADY_EXISTS: 'User with this email already exists.',
  REGISTRATION_SUCCESS: 'Registration successful! You may login now.',
  NO_USER_FOUND: 'No user found with this email.',
  INVALID_PASSWORD: 'Invalid password.',
  LOGOUT_SUCCESS: 'Logged out successfully.',

  // Employee
  EMPLOYEE_ADD_SUCCESS: 'Employee added successfully.',
  EMPLOYEE_UPDATE_SUCCESS: 'Employee updated successfully.',
  EMPLOYEE_DELETE_SUCCESS: 'Employee deleted successfully.',
  EMPLOYEE_EMAIL_EXISTS: 'Employee with this email already exists.',
  EMPLOYEE_VALIDATION_ERROR: 'Employee name and email are required.',
  EMPLOYEE_NOT_FOUND: 'Employee not found for leave request.',

  // Leave
  LEAVE_REQUEST_SUCCESS: 'Leave request created successfully.',
  LEAVE_REQUEST_VALIDATION_ERROR: 'Please select employee and number of days.',

  // Attendance
  CLOCK_IN_SUCCESS: (time: string) => `Clocked in at ${time}`,
  CLOCK_OUT_SUCCESS: (time: string) => `Clocked out at ${time}`,
  ALREADY_CLOCKED_IN: 'Already clocked in today.',
  ALREADY_CLOCKED_OUT: 'Already clocked out today.',
  CLOCK_IN_REQUIRED: 'You must clock in before clocking out.',
};
