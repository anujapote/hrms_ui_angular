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
    return this.http.get<AttendanceRecord[]>(this.apiUrl);
  }

  getEmployeeAttendance(employeeId: number): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  clockIn(employeeId: number, data: any): Observable<AttendanceRecord> {
    return this.http.post<AttendanceRecord>(`${this.apiUrl}/clock-in`, { employeeId, ...data });
  }

  clockOut(employeeId: number, data: any): Observable<AttendanceRecord> {
    return this.http.post<AttendanceRecord>(`${this.apiUrl}/clock-out`, { employeeId, ...data });
  }
}
