export const ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',

  EMPLOYEE_ROOT: '/employee',
  EMPLOYEE_DASHBOARD: '/employee/dashboard',
  EMPLOYEE_REGISTRATION: '/employee/registration',
  EMPLOYEE_LIST: '/employee/list',

  LEAVE_ROOT: '/leave',
  LEAVE_PENDING: '/leave/pending',
  LEAVE_APPROVED: '/leave/approved',
  LEAVE_REJECTED: '/leave/rejected',

  DIRECTORY: '/directory',

  ATTENDANCE_ROOT: '/attendance',
  ATTENDANCE_TODAY: '/attendance/today',
  ATTENDANCE_TIMESHEET: '/attendance/timesheet',
};

export const SECTION_ROUTES: Record<string, any> = {
  employee: {
    label: 'Employees',
    default: ROUTES.EMPLOYEE_DASHBOARD,
    items: [
      { label: 'Dashboard', path: ROUTES.EMPLOYEE_DASHBOARD },
      { label: 'Registration', path: ROUTES.EMPLOYEE_REGISTRATION },
      { label: 'Existing Employees', path: ROUTES.EMPLOYEE_LIST },
    ],
  },
  leave: {
    label: 'Leaves',
    default: ROUTES.LEAVE_PENDING,
    items: [
      { label: 'Pending Leaves', path: ROUTES.LEAVE_PENDING },
      { label: 'Approved Leaves', path: ROUTES.LEAVE_APPROVED },
      { label: 'Rejected Leaves', path: ROUTES.LEAVE_REJECTED },
    ],
  },
  attendance: {
    label: 'Time & Attendance',
    default: ROUTES.ATTENDANCE_TODAY,
    items: [
      { label: 'Today', path: ROUTES.ATTENDANCE_TODAY },
      { label: 'Timesheet', path: ROUTES.ATTENDANCE_TIMESHEET },
    ],
  },
  directory: {
    label: 'Directory',
    default: ROUTES.DIRECTORY,
    items: [{ label: 'Employee Directory', path: ROUTES.DIRECTORY }],
  },
};
