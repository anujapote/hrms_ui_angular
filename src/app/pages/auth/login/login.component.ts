import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { validateLoginForm } from '../../../utils/validation';
import { MESSAGES } from '../../../constants/app.config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  authService = inject(AuthService);
  messageService = inject(MessageService);
  router = inject(Router);

  formData = { email: '', password: '' };
  errors: Record<string, string> = {};
  isLoading = false;

  handleChange(field: string) {
    if (this.errors[field]) {
      this.errors[field] = '';
    }
  }

  handleSubmit() {
    const validation = validateLoginForm(this.formData);
    if (!validation.isValid) {
      this.errors = validation.errors;
      return;
    }

    this.isLoading = true;
    this.authService.login(this.formData).subscribe({
      next: (res) => {
        this.messageService.add('Login successful!');
        this.router.navigate(['/employee/dashboard']);
        this.isLoading = false;
      },
      error: (err) => {
        const errorMessage = err.error?.message || MESSAGES.INVALID_PASSWORD;
        this.messageService.add(errorMessage);
        this.isLoading = false;
      }
    });
  }
}
