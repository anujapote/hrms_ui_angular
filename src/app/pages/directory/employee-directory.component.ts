import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee.service';
import { DEFAULT_LEAVE_BALANCE } from '../../constants/app.config';

@Component({
  selector: 'app-employee-directory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-directory.component.html'
})
export class EmployeeDirectoryComponent implements OnInit {
  employeeService = inject(EmployeeService);
  
  employees: Employee[] = [];
  searchQuery = '';

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((emps: Employee[]) => {
      this.employees = emps;
    });
  }

  get filteredEmployees() {
    const q = this.searchQuery.toLowerCase();
    return this.employees.filter(emp => 
      emp.name?.toLowerCase().includes(q) ||
      emp.email?.toLowerCase().includes(q) ||
      emp.position?.toLowerCase().includes(q) ||
      emp.department?.toLowerCase().includes(q)
    );
  }

  getLeaveBalance(id: number): number {
    // Mock implementation for UI, in a real app this would come from the API
    return DEFAULT_LEAVE_BALANCE;
  }
}
