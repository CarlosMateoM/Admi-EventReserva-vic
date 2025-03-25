import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbaruser',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbaruser.component.html',
  styleUrl: './navbaruser.component.css'
})
export class NavbaruserComponent {
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
}
