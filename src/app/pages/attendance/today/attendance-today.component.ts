import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService, AttendanceRecord } from '../../../services/attendance.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-attendance-today',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance-today.component.html'
})
export class AttendanceTodayComponent implements OnInit {
  attendanceService = inject(AttendanceService);
  authService = inject(AuthService);
  messageService = inject(MessageService);

  todayDate = new Date().toDateString();
  todayRecord: AttendanceRecord | null = null;
  currentUser = this.authService.currentUserValue;

  ngOnInit() {
    this.loadTodayRecord();
  }

  loadTodayRecord() {
    if (!this.currentUser) return;
    this.attendanceService.getEmployeeAttendance(this.currentUser.id).subscribe(records => {
      const today = new Date().toISOString().split('T')[0];
      this.todayRecord = records.find(r => r.date === today) || null;
    });
  }

  handleClockIn() {
    if (!this.currentUser) return;
    
    // Using current time string
    const time = new Date().toLocaleTimeString();
    
    this.attendanceService.clockIn(this.currentUser.id, { clockInTime: time }).subscribe({
      next: () => {
        this.messageService.add(`Clocked in at ${time}`);
        this.loadTodayRecord();
      },
      error: () => {
        this.messageService.add('Failed to clock in');
      }
    });
  }

  handleClockOut() {
    if (!this.currentUser) return;
    
    const time = new Date().toLocaleTimeString();
    
    this.attendanceService.clockOut(this.currentUser.id, { clockOutTime: time }).subscribe({
      next: () => {
        this.messageService.add(`Clocked out at ${time}`);
        this.loadTodayRecord();
      },
      error: () => {
        this.messageService.add('Failed to clock out');
      }
    });
  }
}
