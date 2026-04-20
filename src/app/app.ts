import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { SECTION_ROUTES } from './constants/routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './app.html',
})
export class App {
  authService = inject(AuthService);
  messageService = inject(MessageService);
  router = inject(Router);

  get isAuthRoute() {
    return this.router.url.startsWith('/auth/');
  }

  handleNavigate(section: string) {
    if (SECTION_ROUTES[section]) {
      this.router.navigate([SECTION_ROUTES[section].default]);
    }
  }
}
