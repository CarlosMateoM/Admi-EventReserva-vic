import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Me } from '../../core/services/interface/auth.interface';
import { FormsModule } from '@angular/forms';
import { AuthStateService } from '../../core/services/auth-state.service';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private authStateService = inject(AuthStateService);
  // user = this.authStateService.getUser();

  user: Me = {
    id: 0,
    nombre: '',
    email: '',
    password: '',
    rol: ''
  };
  message: string = '';
  currentDate: string = '';

  ngOnInit(): void {
    const today = new Date();
    this.currentDate = today.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
 // Obtener el usuario directamente del estado
    const storedUser = this.authStateService.getUser();
    if (storedUser) {
      this.user = storedUser;
    } else {
      this.me(); // Llama al método para obtener el usuario del servidor si no está en el estado
    }
  }

  me() {
    this.authService.me().subscribe({
      next: response => {
        this.user = response;
      },
      error: error => {
        this.message = error.message;
      }
    });
  }

  openModal() {
    const modal = document.getElementById('editModal');
    if (modal) modal.classList.remove('hidden');
  }

  closeModal() {
    const modal = document.getElementById('editModal');
    if (modal) modal.classList.add('hidden');
  }

  setUser(user: Me): void {
    this.user = user;
  }

  updateUser() {
    this.authService.updateUser(this.user).subscribe({
      next: response => {
        this.user = response;
        this.closeModal();
      }, error: error => {
        this.message = error.message;
      }
    });
  }
}
