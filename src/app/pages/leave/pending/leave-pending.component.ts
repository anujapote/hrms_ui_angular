import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaveService, LeaveRequest } from '../../../services/leave.service';
import { EmployeeService, Employee } from '../../../services/employee.service';
import { MessageService } from '../../../services/message.service';
import { LEAVE_TYPES, MESSAGES } from '../../../constants/app.config';

@Component({
  selector: 'app-leave-pending',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-pending.component.html'
})
export class LeavePendingComponent implements OnInit {
  leaveService = inject(LeaveService);
  employeeService = inject(EmployeeService);
  messageService = inject(MessageService);

  LEAVE_TYPES = LEAVE_TYPES;
  employees: Employee[] = [];
  pendingLeaves: LeaveRequest[] = [];
  
  formData = {
    employeeId: '',
    type: LEAVE_TYPES[0],
    days: 1
  };
  errors: Record<string, string> = {};

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(emps => {
      this.employees = emps;
    });
    this.loadLeaves();
  }

  loadLeaves() {
    this.leaveService.getLeaveRequests().subscribe(leaves => {
      this.pendingLeaves = leaves.filter(l => l.status.toLowerCase() === 'pending');
    });
  }

  handleChange(field: string) {
    if (this.errors[field]) {
      this.errors[field] = '';
    }
  }

  handleSubmit() {
    if (!this.formData.employeeId || !this.formData.days) {
      this.errors['employeeId'] = 'Please select an employee and number of days';
      return;
    }

    const employee = this.employees.find(e => e.id === Number(this.formData.employeeId));
    if (!employee) {
      this.messageService.add(MESSAGES.EMPLOYEE_NOT_FOUND);
      return;
    }

    const payload = {
      employeeId: employee.id,
      employeeName: employee.name,
      type: this.formData.type,
      days: Number(this.formData.days),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    this.leaveService.createLeaveRequest(payload).subscribe({
      next: () => {
        this.messageService.add(MESSAGES.LEAVE_REQUEST_SUCCESS);
        this.formData = { employeeId: '', type: LEAVE_TYPES[0], days: 1 };
        this.loadLeaves();
      }
    });
  }

  handleApprove(id: number) {
    this.leaveService.updateLeaveStatus(id, 'Approved').subscribe(() => {
      this.messageService.add('Leave request approved!');
      this.loadLeaves();
    });
  }

  handleReject(id: number) {
    this.leaveService.updateLeaveStatus(id, 'Rejected').subscribe(() => {
      this.messageService.add('Leave request rejected!');
      this.loadLeaves();
    });
  }
}
