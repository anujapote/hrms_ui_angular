import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName?: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = `${environment.apiUrl}/leaves`;

  constructor(private http: HttpClient) {}

  getLeaveRequests(): Observable<LeaveRequest[]> {
    const leaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    return new Observable(subscriber => {
      subscriber.next(leaves);
      subscriber.complete();
    });
  }

  getEmployeeLeaveRequests(employeeId: number): Observable<LeaveRequest[]> {
    const leaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const employeeLeaves = leaves.filter((l: any) => l.employeeId === employeeId);
    return new Observable(subscriber => {
      subscriber.next(employeeLeaves);
      subscriber.complete();
    });
  }

  createLeaveRequest(request: any): Observable<LeaveRequest> {
    const leaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const newRequest = { 
      ...request, 
      id: Date.now(), 
      status: 'Pending', 
      appliedOn: new Date().toISOString() 
    };
    leaves.push(newRequest);
    localStorage.setItem('leaveRequests', JSON.stringify(leaves));
    return new Observable(subscriber => {
      subscriber.next(newRequest);
      subscriber.complete();
    });
  }

  updateLeaveStatus(id: number, status: string): Observable<LeaveRequest> {
    const leaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const index = leaves.findIndex((l: any) => l.id === id);
    if (index !== -1) {
      leaves[index].status = status;
      localStorage.setItem('leaveRequests', JSON.stringify(leaves));
      return new Observable(subscriber => {
        subscriber.next(leaves[index]);
        subscriber.complete();
      });
    }
    return new Observable(subscriber => {
      subscriber.error('Leave request not found');
      subscriber.complete();
    });
  }
}
