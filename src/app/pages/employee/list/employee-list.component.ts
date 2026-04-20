import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../../services/employee.service';
import { MessageService } from '../../../services/message.service';
import { MESSAGES } from '../../../constants/app.config';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  employeeService = inject(EmployeeService);
  messageService = inject(MessageService);

  employees: Employee[] = [];
  searchQuery = '';
  editingEmployee: Employee | null = null;
  editFormData: Partial<Employee> = {};
  errors: Record<string, string> = {};

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
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

  handleEdit(employee: Employee) {
    this.editingEmployee = employee;
    this.editFormData = { ...employee };
    this.errors = {};
  }

  handleEditChange(field: keyof Employee) {
    if (this.errors[field]) {
      this.errors[field] = '';
    }
  }

  handleSaveEdit() {
    if (!this.editFormData.name || !this.editFormData.email) {
      this.errors['name'] = !this.editFormData.name ? 'Required' : '';
      this.errors['email'] = !this.editFormData.email ? 'Required' : '';
      return;
    }
    
    if (this.editingEmployee) {
      this.employeeService.updateEmployee(this.editingEmployee.id, this.editFormData).subscribe(() => {
        this.messageService.add(MESSAGES.EMPLOYEE_UPDATE_SUCCESS);
        this.editingEmployee = null;
        this.loadEmployees();
      });
    }
  }

  handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.messageService.add(MESSAGES.EMPLOYEE_DELETE_SUCCESS);
        this.loadEmployees();
      });
    }
  }
}
