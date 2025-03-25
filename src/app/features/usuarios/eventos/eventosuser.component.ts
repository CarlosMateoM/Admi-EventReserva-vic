import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-eventosuser',
  imports: [CommonModule],
  templateUrl: './eventosuser.component.html',
  styleUrl: './eventosuser.component.css'
})
export class EventosuserComponent {

  eventos = [
    {
      titulo: 'Evento 1',
      descripcion: 'Descripción del evento 1',
      fechaInicio: '2021-10-01',
      fechaFin: '2021-10-03',
      capacidad: 100,
    },
    {
      titulo: 'Evento 2',
      descripcion: 'Descripción del evento 2',
      fechaInicio: '2021-10-05',
      fechaFin: '2021-10-07',
      capacidad: 200,
    },
    {
      titulo: 'Evento 3',
      descripcion: 'Descripción del evento 3',
      fechaInicio: '2021-10-10',
      fechaFin: '2021-10-12',
      capacidad: 300,
    },
  ]
}
