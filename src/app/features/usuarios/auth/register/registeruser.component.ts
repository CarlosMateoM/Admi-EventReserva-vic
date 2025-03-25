import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AlertComponent } from '../../../alert/alert.component';

@Component({
  selector: 'app-registeruser',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AlertComponent],
  templateUrl: './registeruser.component.html',
  styleUrl: './registeruser.component.css'
})
export class RegisteruserComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);

  isLoading: boolean = false;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | 'warning' | 'info' = 'info';
  registerForm!: FormGroup;


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['usuario']
    })
  }

  register() {
    if (this.registerForm.invalid) return;
    this.isLoading = true;
    this.authService.createUser(this.registerForm.value).subscribe({
      next: response => {
        this.alertMessage = response.message;
        this.alertType = 'success';
        this.isLoading = false;
      },
      error: error => {
        this.alertMessage = error.error.message;
        this.alertType = 'error';
        this.isLoading = false;
      }
    });
  }
}
