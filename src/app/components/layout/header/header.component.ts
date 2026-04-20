import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../../services/auth.service';

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
  }
}
