import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../alert/alert.component';
import { AuthInterface } from '../../../core/services/interface/auth.interface';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, AlertComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private authService: AuthService = inject(AuthService);
  registerForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    rol: new FormControl('')
  });
  alertMessage: string = '';
  alertType: 'success' | 'error' | 'warning' | 'info' = 'info';
  isLoading: boolean = false;

  register(): void {
    if (this.registerForm.invalid) return;
    this.isLoading = true;
    const credencials: AuthInterface = this.registerForm.value as { nombre: string, email: string; password: string, rol: string };

    this.authService.createUser(credencials).subscribe(response => {
      this.alertMessage = response.message;
      this.alertType = 'success';
      this.isLoading = false;
    }, error => {
      this.alertMessage = error.error.message;
      this.alertType = 'error';
      this.isLoading = false;
    });
  }
}