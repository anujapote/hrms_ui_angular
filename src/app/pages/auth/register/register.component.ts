import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { validateRegistrationForm } from '../../../utils/validation';
import { MESSAGES } from '../../../constants/app.config';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  authService = inject(AuthService);
  messageService = inject(MessageService);
  router = inject(Router);

  formData = { name: '', email: '', password: '' };
  errors: Record<string, string> = {};
  isLoading = false;

  handleChange(field: string) {
    if (this.errors[field]) {
      this.errors[field] = '';
    }
  }

  handleSubmit() {
    const validation = validateRegistrationForm(this.formData);
    if (!validation.isValid) {
      this.errors = validation.errors;
      return;
    }

    this.isLoading = true;
    this.authService.register(this.formData).subscribe({
      next: (res) => {
        this.messageService.add(MESSAGES.REGISTRATION_SUCCESS);
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        this.messageService.add(MESSAGES.USER_ALREADY_EXISTS);
        this.isLoading = false;
      }
    });
  }
}
