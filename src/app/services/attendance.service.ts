import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  date: string;
  clockInTime: string;
  clockOutTime: string | null;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = `${environment.apiUrl}/attendance`;

  constructor(private http: HttpClient) {}

  getAttendanceRecords(): Observable<AttendanceRecord[]> {
    const records = JSON.parse(localStorage.getItem('attendance') || '[]');
    return new Observable(subscriber => {
      subscriber.next(records);
      subscriber.complete();
    });
  }

  getEmployeeAttendance(employeeId: number): Observable<AttendanceRecord[]> {
    const records = JSON.parse(localStorage.getItem('attendance') || '[]');
    const employeeRecords = records.filter((r: any) => r.employeeId === employeeId);
    return new Observable(subscriber => {
      subscriber.next(employeeRecords);
      subscriber.complete();
    });
  }

  clockIn(employeeId: number, data: any): Observable<AttendanceRecord> {
    const records = JSON.parse(localStorage.getItem('attendance') || '[]');
    const today = new Date().toISOString().split('T')[0];
    const newRecord = { 
      ...data, 
      id: Date.now(), 
      employeeId, 
      date: today,
      clockOutTime: null,
      status: 'Present' 
    };
    records.push(newRecord);
    localStorage.setItem('attendance', JSON.stringify(records));
    return new Observable(subscriber => {
      subscriber.next(newRecord);
      subscriber.complete();
    });
  }

  clockOut(employeeId: number, data: any): Observable<AttendanceRecord> {
    const records = JSON.parse(localStorage.getItem('attendance') || '[]');
    // Find the latest active clock-in for this employee
    const index = records.findIndex((r: any) => r.employeeId === employeeId && r.clockOutTime === null);
    if (index !== -1) {
      records[index].clockOutTime = data.clockOutTime;
      localStorage.setItem('attendance', JSON.stringify(records));
      return new Observable(subscriber => {
        subscriber.next(records[index]);
        subscriber.complete();
      });
    }
    return new Observable(subscriber => {
      subscriber.error('Active clock-in record not found');
      subscriber.complete();
    });
  }
}
