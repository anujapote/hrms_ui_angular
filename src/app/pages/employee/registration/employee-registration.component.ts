import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { MessageService } from '../../../services/message.service';
import { MESSAGES } from '../../../constants/app.config';

@Component({
  selector: 'app-employee-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-registration.component.html'
})
export class EmployeeRegistrationComponent {
  employeeService = inject(EmployeeService);
  messageService = inject(MessageService);

  STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi'
  ];
  COUNTRIES = ['India'];

  sameAsResidential = false;
  isLoading = false;
  errors: Record<string, string> = {};

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfJoining: '',
    dateOfBirth: '',
    position: '',
    department: '',
    resAddressLine1: '',
    resAddressLine2: '',
    resPinCode: '',
    resState: '',
    resCountry: '',
    permAddressLine1: '',
    permAddressLine2: '',
    permPinCode: '',
    permState: '',
    permCountry: '',
  };

  handleChange(field: string) {
    if (this.errors[field]) {
      this.errors[field] = '';
    }

    if (this.sameAsResidential && field.startsWith('res')) {
      const permField = field.replace('res', 'perm') as keyof typeof this.formData;
      (this.formData as any)[permField] = (this.formData as any)[field];
    }
  }

  handleCheckbox(checked: boolean) {
    this.sameAsResidential = checked;
    if (checked) {
      this.formData.permAddressLine1 = this.formData.resAddressLine1;
      this.formData.permAddressLine2 = this.formData.resAddressLine2;
      this.formData.permPinCode = this.formData.resPinCode;
      this.formData.permState = this.formData.resState;
      this.formData.permCountry = this.formData.resCountry;
    }
  }

  handleSubmit(form: NgForm) {
    if (form.invalid) {
      this.messageService.add('Please fill in all required fields correctly');
      return;
    }

    this.isLoading = true;
    const finalData = {
      name: `${this.formData.firstName} ${this.formData.lastName}`,
      email: this.formData.email,
      position: this.formData.position,
      department: this.formData.department,
      phone: this.formData.phone,
      joinDate: this.formData.dateOfJoining,
      addresses: [
        {
          type: 'Residential',
          addressLine1: this.formData.resAddressLine1,
          addressLine2: this.formData.resAddressLine2,
          pinCode: this.formData.resPinCode,
          state: this.formData.resState,
          country: this.formData.resCountry,
        },
        {
          type: 'Permanent',
          addressLine1: this.formData.permAddressLine1,
          addressLine2: this.formData.permAddressLine2,
          pinCode: this.formData.permPinCode,
          state: this.formData.permState,
          country: this.formData.permCountry,
        }
      ]
    };

    this.employeeService.createEmployee(finalData).subscribe({
      next: () => {
        this.messageService.add(MESSAGES.EMPLOYEE_ADD_SUCCESS);
        this.isLoading = false;
        // reset form
        form.resetForm();
        this.formData = {
          firstName: '', lastName: '', email: '', phone: '',
          dateOfJoining: '', dateOfBirth: '', position: '', department: '',
          resAddressLine1: '', resAddressLine2: '', resPinCode: '', resState: '', resCountry: '',
          permAddressLine1: '', permAddressLine2: '', permPinCode: '', permState: '', permCountry: ''
        };
        this.sameAsResidential = false;
      },
      error: () => {
        this.messageService.add('Error adding employee');
        this.isLoading = false;
      }
    });
  }
}
