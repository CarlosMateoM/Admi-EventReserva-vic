import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbaruser',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbaruser.component.html',
  styleUrl: './navbaruser.component.css'
})
export class NavbaruserComponent {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  usuario = {
    nombre: "Victor Alfonso",
    foto: "assets/victor.webp" // O cualquier URL de imagen
  };


  notificaciones = [
    { mensaje: "Nueva reserva confirmada" },
    { mensaje: "Evento modificado por el organizador" }
  ];
  mostrarNotificaciones = false;

  toggleNotificaciones() {
    this.mostrarNotificaciones = !this.mostrarNotificaciones;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/loginUser']);
  }
}
