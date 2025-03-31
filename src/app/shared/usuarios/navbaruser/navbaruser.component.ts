import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Me } from '../../../core/services/interface/auth.interface';

@Component({
  selector: 'app-navbaruser',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbaruser.component.html',
  styleUrl: './navbaruser.component.css'
})
export class NavbaruserComponent implements OnInit {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  usuario: Me = {
    id: 0,
    nombre: '',
    email: '',
    password: '',
    rol: '',
  };
  foto = "assets/victor.webp" // O cualquier URL de imagen


  notificaciones = [
    { mensaje: "Nueva reserva confirmada" },
    { mensaje: "Evento modificado por el organizador" }
  ];

  mostrarNotificaciones = false;

  ngOnInit(): void {
    this.me();
  }

  me() {
    this.authService.me().subscribe({
      next: response => {
        this.usuario = response;
      },
      error: error => {
        console.log(error.error.message)
      }
    })
  }

  toggleNotificaciones() {
    this.mostrarNotificaciones = !this.mostrarNotificaciones;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/loginUser']);
  }
}
