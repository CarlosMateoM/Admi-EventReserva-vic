import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Me } from '../../core/services/interface/auth.interface';
import { UserStateService } from '../../core/services/state.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-me',
  imports: [CommonModule, FormsModule],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private userStateService: UserStateService = inject(UserStateService);
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
    const cachedUser = this.userStateService.getUser();
    if (cachedUser) {
      this.user = cachedUser; // Usa el usuario almacenado en el estado
    } else {
      this.me(); // Si no hay usuario en el estado, haz la solicitud
    }
  }

  me() {
    this.authService.me().subscribe(response => {
      this.user = response;
    }, error => {
      this.message = error.message;
    })
  }

  openModal() {
    const modal = document.getElementById('editModal');
    if (modal) modal.classList.remove('hidden');
  }

  closeModal() {
    const modal = document.getElementById('editModal');
    if (modal) modal.classList.add('hidden');
  }

  updateUser() {
    this.authService.updateUser(this.user).subscribe(response => {
      this.user = response;
      this.closeModal();
    }, error => {
      this.message = error.message;
    })
  }


}
