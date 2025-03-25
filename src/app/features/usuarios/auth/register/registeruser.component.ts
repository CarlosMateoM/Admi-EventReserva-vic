import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registeruser',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registeruser.component.html',
  styleUrl: './registeruser.component.css'
})
export class RegisteruserComponent {

  registerForm: FormGroup;
  isLoading: boolean = false;
  alertMessage: string | null = null;
  alertType: string = 'error';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.alertMessage = 'Registro exitoso';
      this.alertType = 'success';
    }, 2000);
  }
}
