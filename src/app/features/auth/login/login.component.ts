import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserLogin } from '../../../core/services/interface/auth.interface';
import { AlertComponent } from '../../alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, AlertComponent, CommonModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  alertMessage: string = '';
  alertType: 'success' | 'error' | 'warning' | 'info' = 'info';
  isLoading: boolean = false;

  login(): void {
    if (this.loginForm.invalid) return;
    
    this.isLoading = true;
    this.alertMessage = '';
    const credentials: UserLogin = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/layout']);
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.isLoading = false;
        this.alertMessage = error.error?.message || 'Error al iniciar sesión';
        this.alertType = 'error';
      }
    });
  }
}
