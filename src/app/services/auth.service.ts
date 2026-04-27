import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: any): Observable<any> {
    // Try mock first for development if no backend is specified
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Always ensure default admin user exists for development
    const adminEmail = 'admin@hrms.com';
    if (!users.find((u: any) => u.email.toLowerCase() === adminEmail)) {
      const defaultAdmin = {
        id: 1,
        name: 'Admin User',
        email: adminEmail,
        password: 'password123',
        role: 'Admin'
      };
      users.push(defaultAdmin);
      localStorage.setItem('users', JSON.stringify(users));
    }

    // Seed employees if empty
    let employees = JSON.parse(localStorage.getItem('employees') || '[]');
    if (employees.length === 0) {
      employees = [
        { id: 101, name: 'Anil Kumar', email: 'anil@example.com', position: 'Software Engineer', department: 'IT', status: 'Active', joinDate: '2025-01-15T00:00:00.000Z' },
        { id: 102, name: 'Sunita Sharma', email: 'sunita@example.com', position: 'HR Manager', department: 'HR', status: 'Active', joinDate: '2024-11-20T00:00:00.000Z' },
        { id: 103, name: 'Rajesh Gupta', email: 'rajesh@example.com', position: 'Project Manager', department: 'Operations', status: 'Active', joinDate: '2024-05-10T00:00:00.000Z' },
        { id: 104, name: 'Priya Singh', email: 'priya@example.com', position: 'UI Designer', department: 'Design', status: 'Active', joinDate: '2025-02-01T00:00:00.000Z' },
        { id: 105, name: 'Vikram Mehta', email: 'vikram@example.com', position: 'QA Lead', department: 'IT', status: 'Active', joinDate: '2024-08-12T00:00:00.000Z' }
      ];
      localStorage.setItem('employees', JSON.stringify(employees));
    }

    // Seed leave requests if empty
    let leaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    if (leaves.length === 0) {
      leaves = [
        { id: 1, employeeId: 101, employeeName: 'Anil Kumar', type: 'Annual', startDate: '2025-04-25', endDate: '2025-04-27', reason: 'Family function', status: 'Pending', appliedOn: new Date().toISOString() },
        { id: 2, employeeId: 102, employeeName: 'Sunita Sharma', type: 'Sick', startDate: '2025-04-10', endDate: '2025-04-11', reason: 'Flu', status: 'Approved', appliedOn: new Date().toISOString() },
        { id: 3, employeeId: 103, employeeName: 'Rajesh Gupta', type: 'Other', startDate: '2025-04-15', endDate: '2025-04-15', reason: 'Personal work', status: 'Rejected', appliedOn: new Date().toISOString() }
      ];
      localStorage.setItem('leaveRequests', JSON.stringify(leaves));
    }

    // Seed attendance if empty
    let attendance = JSON.parse(localStorage.getItem('attendance') || '[]');
    if (attendance.length === 0) {
      const today = new Date().toISOString().split('T')[0];
      attendance = [
        { id: 1, employeeId: 101, date: today, clockInTime: '09:00', clockOutTime: '18:00', status: 'Present' },
        { id: 2, employeeId: 102, date: today, clockInTime: '09:15', clockOutTime: null, status: 'Present' }
      ];
      localStorage.setItem('attendance', JSON.stringify(attendance));
    }

    const user = users.find((u: any) => 
      u.email.toLowerCase() === credentials.email.toLowerCase() && 
      (u.password === credentials.password || (u.email.toLowerCase() === adminEmail && credentials.password === 'admin123'))
    );

    if (user) {
      console.log('Mock login successful for:', user.email);
      const response = { token: 'mock-jwt-token', user };
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      this.currentUserSubject.next(response.user);
      return new Observable(subscriber => {
        subscriber.next(response);
        subscriber.complete();
      });
    }

    console.log('Mock login failed for:', credentials.email);

    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.email === userData.email)) {
      return new Observable(subscriber => {
        subscriber.error({ status: 400, error: { message: 'User already exists' } });
      });
    }

    const newUser = { ...userData, id: Date.now(), role: 'Employee' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return new Observable(subscriber => {
      subscriber.next(newUser);
      subscriber.complete();
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
