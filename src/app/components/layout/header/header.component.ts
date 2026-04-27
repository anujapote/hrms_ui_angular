import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { MESSAGES } from '../../../constants/app.config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() loggedIn = false;
  @Input() activeSection = 'employee';
  @Output() sectionClick = new EventEmitter<string>();
  
  authService = inject(AuthService);
  messageService = inject(MessageService);
  router = inject(Router);
  user: User | null = null;

  constructor() {
    this.authService.currentUser$.subscribe(u => {
      this.user = u;
      this.loggedIn = !!u;
    });
  }

  onSectionClick(section: string) {
    this.sectionClick.emit(section);
  }

  onLogout() {
    this.authService.logout();
    this.messageService.add(MESSAGES.LOGOUT_SUCCESS);
    this.router.navigate(['/auth/login']);
  }
}
