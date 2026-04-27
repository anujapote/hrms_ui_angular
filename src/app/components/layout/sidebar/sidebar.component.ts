import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { SECTION_ROUTES } from '../../../constants/routes';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  currentSectionItems: any[] = [];
  currentPath = '';

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSidebar();
      }
    });
  }

  ngOnInit() {
    this.updateSidebar();
  }

  updateSidebar() {
    this.currentPath = this.location.path() || '';
    const pathParts = this.currentPath.split('/').filter(Boolean);
    const section = pathParts[0] || 'employee';
    
    if (SECTION_ROUTES[section]) {
      this.currentSectionItems = SECTION_ROUTES[section].items;
    } else {
      this.currentSectionItems = [];
    }
  }

  isActive(path: string) {
    return this.currentPath === path;
  }
}
