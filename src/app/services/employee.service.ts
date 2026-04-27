import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  status: string;
  joinDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    return new Observable(subscriber => {
      subscriber.next(employees);
      subscriber.complete();
    });
  }

  getEmployee(id: number): Observable<Employee> {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const employee = employees.find((e: any) => e.id === id);
    return new Observable(subscriber => {
      if (employee) {
        subscriber.next(employee);
      } else {
        subscriber.error('Employee not found');
      }
      subscriber.complete();
    });
  }

  createEmployee(employee: any): Observable<Employee> {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const newEmployee = { ...employee, id: Date.now(), status: 'Active', joinDate: new Date().toISOString() };
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));
    return new Observable(subscriber => {
      subscriber.next(newEmployee);
      subscriber.complete();
    });
  }

  updateEmployee(id: number, employee: any): Observable<Employee> {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const index = employees.findIndex((e: any) => e.id === id);
    if (index !== -1) {
      employees[index] = { ...employees[index], ...employee };
      localStorage.setItem('employees', JSON.stringify(employees));
      return new Observable(subscriber => {
        subscriber.next(employees[index]);
        subscriber.complete();
      });
    }
    return new Observable(subscriber => {
      subscriber.error('Employee not found');
      subscriber.complete();
    });
  }

  deleteEmployee(id: number): Observable<any> {
    let employees = JSON.parse(localStorage.getItem('employees') || '[]');
    employees = employees.filter((e: any) => e.id !== id);
    localStorage.setItem('employees', JSON.stringify(employees));
    return new Observable(subscriber => {
      subscriber.next({ success: true });
      subscriber.complete();
    });
  }
}
