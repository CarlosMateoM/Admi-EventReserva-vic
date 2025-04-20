import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AlertComponent } from '../../../alert/alert.component';



@Component({
  selector: 'app-loginuser',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AlertComponent],
  providers: [],
  templateUrl: './loginuser.component.html',
  styleUrl: './loginuser.component.css'
})
export class LoginuserComponent {

  private formBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);

  loginForm!: FormGroup;
  isLoading: boolean = false;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | 'warning' | 'info' = 'info';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: response => {
        this.authService.setToken(response.token);
        this.isLoading = false;
        this.router.navigate(['/layaoutuser/eventos']);
      },
      error: error => {
        this.alertMessage = error.error.message;
        this.alertType = 'error';
        this.isLoading = false;
      }
    });
  }
}
