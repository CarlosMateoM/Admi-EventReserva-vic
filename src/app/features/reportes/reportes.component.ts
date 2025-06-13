import { Component, inject, OnInit } from '@angular/core';
import { ReportService } from './reportes.service';
import { CreateEvent } from '../eventos/interfaces/eventos.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservasPorEventoResponse } from './reportes.service';

@Component({
  selector: 'app-reportes',
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit{
  reportService: ReportService = inject(ReportService);

  events: CreateEvent[] = [];
  selectedEventId: number | null = null;
  selectedEvent: ReservasPorEventoResponse | null = null;
  currentDate: string = '';

  ngOnInit(): void {
    this.selectedEventId = null;
    this.selectedEvent = null;
    this.currentDate = new Date().toLocaleDateString('es-ES', {
      day: 'numeric'
    });

    this.reportService.getEvents().subscribe({
      next: (events: CreateEvent[]) => {
        this.events = events;
      },
      error: (error) => {
        console.error('Error al cargar eventos:', error);
        alert('Error al cargar eventos');
      }
    });
  }

  onEventSelect(eventId: number): void {
    this.selectedEventId = eventId;
    this.getReservasByEvent(eventId);
  }

  getReservasByEvent(eventId: number | null): void {
    if (!eventId) {
      alert('Por favor, seleccione un evento');
      return;
    }

    this.reportService.getReservasByEvent(eventId).subscribe({
      next: (response: ReservasPorEventoResponse) => {
        console.log('Reservas por evento:', response);
        this.selectedEvent = response;
      },
      error: (error) => {
        console.error('Error al obtener reservas:', error);
        alert('Error al obtener las reservas del evento');
      }
    });
  }

  exportToCSV(tipo: string, id?: number): void {
    this.reportService.exportReportToCSV(tipo, id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_${tipo}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error: (error) => {
        console.error('Error al exportar:', error);
        alert('Error al exportar el reporte');
      }
    });
  }
}
