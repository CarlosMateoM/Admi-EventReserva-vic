import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  isLoading: boolean = false;

  logout() {
    this.isLoading = true;
    setTimeout(() => {
      this.authService.logout();
      this.isLoading = false;
      this.router.navigate(['/login']);
    }, 1000);

  }
}
