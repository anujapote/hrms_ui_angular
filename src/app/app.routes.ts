import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { EmployeeDashboardComponent } from './pages/employee/dashboard/employee-dashboard.component';
import { EmployeeRegistrationComponent } from './pages/employee/registration/employee-registration.component';
import { EmployeeListComponent } from './pages/employee/list/employee-list.component';
import { LeavePendingComponent } from './pages/leave/pending/leave-pending.component';
import { LeaveApprovedComponent } from './pages/leave/approved/leave-approved.component';
import { LeaveRejectedComponent } from './pages/leave/rejected/leave-rejected.component';
import { EmployeeDirectoryComponent } from './pages/directory/employee-directory.component';
import { AttendanceTodayComponent } from './pages/attendance/today/attendance-today.component';
import { AttendanceTimesheetComponent } from './pages/attendance/timesheet/attendance-timesheet.component';

export const routes: Routes = [
  // Default Route
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  
  // Auth
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  // Employee
  { path: 'employee', redirectTo: 'employee/dashboard', pathMatch: 'full' },
  { path: 'employee/dashboard', component: EmployeeDashboardComponent },
  { path: 'employee/registration', component: EmployeeRegistrationComponent },
  { path: 'employee/list', component: EmployeeListComponent },

  // Leave
  { path: 'leave', redirectTo: 'leave/pending', pathMatch: 'full' },
  { path: 'leave/pending', component: LeavePendingComponent },
  { path: 'leave/approved', component: LeaveApprovedComponent },
  { path: 'leave/rejected', component: LeaveRejectedComponent },

  // Directory
  { path: 'directory', component: EmployeeDirectoryComponent },

  // Attendance
  { path: 'attendance', redirectTo: 'attendance/today', pathMatch: 'full' },
  { path: 'attendance/today', component: AttendanceTodayComponent },
  { path: 'attendance/timesheet', component: AttendanceTimesheetComponent },

  // Wildcard
  { path: '**', redirectTo: 'auth/login' }
];
