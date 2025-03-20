import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserLogin } from '../../../core/services/interface/auth.interface';
import { AlertComponent } from '../../alert/alert.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, AlertComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  alertMessage: string = '';
  alertType: 'success' | 'error' | 'warning' | 'info' = 'info';
  isLoading: boolean = false;


  login(): void {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    const credencials: UserLogin = this.loginForm.value as { email: string; password: string };

    // Simular un retardo de 2 segundos
    setTimeout(() => {
      this.authService.login(credencials).subscribe(response => {
        this.authService.setToken(response.token);
        this.isLoading = false;
        this.router.navigate(['/layout']);
      }, error => {
        this.isLoading = false;
        this.alertMessage = error.error.message;
        this.alertType = 'error';
      });
    }, 1000); // 2000 milisegundos = 2 segundos
  }


}
