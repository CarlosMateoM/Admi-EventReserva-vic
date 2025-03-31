import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CreateEvent } from '../../eventos/interfaces/eventos.interface';
import { EVENTOS_STORE } from '../../eventos/store/eventos.store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-eventosuser',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './eventosuser.component.html',
  styleUrls: ['./eventosuser.component.css']
})
export class EventosuserComponent implements OnInit {
  private eventosStore = inject(EVENTOS_STORE);
  eventos = this.eventosStore.eventos;
  loading = this.eventosStore.loading;
  error = this.eventosStore.error;

  ngOnInit(): void {
    // Cargar eventos solo si no hay datos en el store
    this.eventosStore.loadEvents(false);
  }

  // Método para forzar la recarga de eventos si es necesario
  reloadEvents(): void {
    this.eventosStore.loadEvents(true);
  }
}
