import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { AuthInterface } from '../../../core/services/interface/auth.interface';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfiluser',
  imports: [FormsModule, AlertComponent, CommonModule],
  templateUrl: './perfiluser.component.html',
  styleUrl: './perfiluser.component.css'
})
export class PerfiluserComponent implements OnInit {
  private authStateService: AuthStateService = inject(AuthStateService);
  private authService: AuthService = inject(AuthService);
  user: AuthInterface | null = null;
  newPassword: string = '';
  alertMessage: string = '';
  alertType: 'success' | 'error' | 'warning' | 'info' = 'info';
  
  ngOnInit(): void {
    this.user = this.authStateService.getUser();
    // console.log(user)
    if(this.user == null){
      // console.log("llamando al backend....")
      this.authService.userMe().subscribe(response => {
        this.authStateService.setUser(response);
        this.user = response;
        // console.log(response)
      });
    }
  }

  cambiarPassword() {
    this.authService.updatePassword({
      id: this.user?.id!,
      password: this.newPassword
    }).subscribe({
      next: response => {
        this.newPassword = '';
        this.alertMessage = response.message;
        this.alertType = 'success';
      },
      error: error => {
        this.alertMessage = error.message;
        this.alertType = 'error';
      }
    });
  }
}
