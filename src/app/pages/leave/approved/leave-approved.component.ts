import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveService, LeaveRequest } from '../../../services/leave.service';

@Component({
  selector: 'app-leave-approved',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-approved.component.html'
})
export class LeaveApprovedComponent implements OnInit {
  leaveService = inject(LeaveService);
  approvedLeaves: LeaveRequest[] = [];
  totalDaysApproved = 0;

  ngOnInit() {
    this.leaveService.getLeaveRequests().subscribe(leaves => {
      this.approvedLeaves = leaves.filter(l => l.status.toLowerCase() === 'approved');
      this.totalDaysApproved = this.approvedLeaves.reduce((total, lr) => total + ((lr as any).days || 0), 0);
    });
  }
}
