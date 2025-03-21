import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  isLoading: boolean = false;
  userRole: string = '';

  ngOnInit(): void {
    const cachedUser: { rol: string } | null = this.me();
    if (cachedUser) {
      this.userRole = cachedUser.rol;
    }
  }

  logout() {
    this.isLoading = true;
    setTimeout(() => {
      this.authService.logout();
      this.isLoading = false;
      this.router.navigate(['/login']);
    }, 1000);

  }

  me(): { rol: string } | null {
    let user: { rol: string } | null = null;
    this.authService.me().subscribe(response => {
      this.userRole = response.rol;
      user = response;
    });
    return user;
  }
}
