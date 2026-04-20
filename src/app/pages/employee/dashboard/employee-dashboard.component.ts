import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { LeaveService } from '../../../services/leave.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-dashboard.component.html'
})
export class EmployeeDashboardComponent implements OnInit {
  employeeService = inject(EmployeeService);
  leaveService = inject(LeaveService);

  stats = {
    totalEmployees: 0,
    pendingLeaves: 0,
    newEmployees: 0
  };

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(emps => {
      this.stats.totalEmployees = emps.length;
      // Calculate new employees in last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      this.stats.newEmployees = emps.filter(e => new Date(e.joinDate) >= thirtyDaysAgo).length;
    });

    this.leaveService.getLeaveRequests().subscribe(leaves => {
      this.stats.pendingLeaves = leaves.filter(l => l.status === 'Pending').length;
    });
  }
}
