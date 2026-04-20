import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveService, LeaveRequest } from '../../../services/leave.service';

@Component({
  selector: 'app-leave-rejected',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-rejected.component.html'
})
export class LeaveRejectedComponent implements OnInit {
  leaveService = inject(LeaveService);
  rejectedLeaves: LeaveRequest[] = [];

  ngOnInit() {
    this.leaveService.getLeaveRequests().subscribe(leaves => {
      this.rejectedLeaves = leaves.filter(l => l.status.toLowerCase() === 'rejected');
    });
  }
}
