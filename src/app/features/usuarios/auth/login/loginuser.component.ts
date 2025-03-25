import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-loginuser',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './loginuser.component.html',
  styleUrl: './loginuser.component.css'
})
export class LoginuserComponent {

  loginForm: FormGroup;
  isLoading: boolean = false;
  alertMessage: string | null = null;
  alertType: string = 'error';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.alertMessage = 'Inicio de sesión exitoso'; // Simulación
      this.alertType = 'success';
    }, 2000);
  }
}
