import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService, AttendanceRecord } from '../../../services/attendance.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-attendance-timesheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance-timesheet.component.html'
})
export class AttendanceTimesheetComponent implements OnInit {
  attendanceService = inject(AttendanceService);
  authService = inject(AuthService);

  attendanceHistory: AttendanceRecord[] = [];
  currentUser = this.authService.currentUserValue;

  fullDays = 0;
  incompleteDays = 0;

  ngOnInit() {
    if (this.currentUser) {
      this.attendanceService.getEmployeeAttendance(this.currentUser.id).subscribe(records => {
        this.attendanceHistory = records;
        this.calculateStats();
      });
    }
  }

  calculateStats() {
    this.fullDays = this.attendanceHistory.filter(r => r.clockInTime && r.clockOutTime).length;
    this.incompleteDays = this.attendanceHistory.filter(r => !r.clockInTime || !r.clockOutTime).length;
  }

  getDuration(record: AttendanceRecord): string {
    if (!record.clockInTime || !record.clockOutTime) return '-';
    // Dummy parsing for duration
    const inTime = new Date(`2000-01-01 ${record.clockInTime}`);
    const outTime = new Date(`2000-01-01 ${record.clockOutTime}`);
    const diffMs = outTime.getTime() - inTime.getTime();
    if (isNaN(diffMs) || diffMs < 0) return '-';
    
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  }
}
