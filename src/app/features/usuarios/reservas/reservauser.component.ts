import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reservauser',
  imports: [CommonModule],
  templateUrl: './reservauser.component.html',
  styleUrl: './reservauser.component.css'
})
export class ReservauserComponent {
  reservas = [
    {
      titulo: 'Reserva 1',
      detalles: 'Detalles de la reserva 1',
    }
  ]

}
