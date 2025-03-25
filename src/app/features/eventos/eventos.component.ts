import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserStateService } from '../../core/services/state.service';
import { AuthService } from '../../core/services/auth.service';
import { Me } from '../../core/services/interface/auth.interface';
import { CreateEvent } from './interfaces/eventos.interface';
import { FormsModule } from '@angular/forms';
import { EVENTOS_STORE } from './store/eventos.store';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private userStateService: UserStateService = inject(UserStateService);
  private eventosStore = inject(EVENTOS_STORE);

  currentDate: string = '';
  user: Me | null = null;
  selectedEvent: Partial<CreateEvent> = {};

  // Usamos las señales del store directamente
  eventos = this.eventosStore.eventos;
  loading = this.eventosStore.loading;
  error = this.eventosStore.error;

  // Variables para controlar la visibilidad de modales
  showAddModal = false;
  showEditModal = false;
  showConfirmDeleteModal = false;
  eventIdToDelete: number | null = null;

  // Variables para el formulario de creación (usando ngModel)
  titulo: string = '';
  descripcion: string = '';
  fecha_inicio: string = '';
  fecha_fin: string = '';
  capacidad: number = 1;
  organizador_id: number = 0;

  ngOnInit(): void {
    this.eventosStore.loadEvents();
    this.currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const cachedUser = this.userStateService.getUser();
    if (cachedUser) {
      this.setUser(cachedUser);
    } else {
      this.me();
    }
  }

  me(): void {
    this.authService.me().subscribe({
      next: (response) => this.setUser(response),
      error: (error) => console.error('Error al obtener el usuario:', error.message)
    });
  }

  // Registra un nuevo evento
  register(): void {
    if (!this.titulo || !this.descripcion || !this.fecha_inicio || !this.fecha_fin || this.capacidad < 1) {
      console.log('Formulario inválido');
      return;
    }

    const evento: CreateEvent = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      fecha_inicio: this.fecha_inicio,
      fecha_fin: this.fecha_fin,
      capacidad: this.capacidad,
      organizador_id: this.organizador_id
    };

    this.eventosStore.createEvent(evento);
    // Se vuelve a cargar la lista, o se puede optimizar para no hacer reload completo
    // this.eventosStore.loadEvents();
    this.closeModal();
    this.resetForm();
  }

  // Actualiza un evento; se espera que selectedEvent contenga el id y demás campos
  updateEvent(): void {
    this.eventosStore.updateEvent(this.selectedEvent);
    // this.eventosStore.loadEvents();
    this.closeEditModal();
  }

  // Elimina un evento por su id
  deleteEvent(eventId: number): void {
    this.eventosStore.deleteEvent(eventId);
  }

  openModal(): void {
    this.showAddModal = true;
  }

  closeModal(): void {
    this.showAddModal = false;
  }

  openEditModal(event: CreateEvent) {
    this.selectedEvent = { ...event };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  setUser(user: Me): void {
    this.user = user;
    this.organizador_id = user.id ?? 0;
  }

  resetForm(): void {
    this.titulo = '';
    this.descripcion = '';
    this.fecha_inicio = '';
    this.fecha_fin = '';
    this.capacidad = 1;
  }

  // Abre el modal de confirmación
  openConfirmDeleteModal(eventId: number): void {
    this.eventIdToDelete = eventId;
    this.showConfirmDeleteModal = true;
  }

  // Cierra el modal de confirmación
  closeConfirmDeleteModal(): void {
    this.showConfirmDeleteModal = false;
    this.eventIdToDelete = null;
  }

  // Confirma la eliminación del evento
  confirmDeleteEvent(): void {
    if (this.eventIdToDelete !== null) {
      this.deleteEvent(this.eventIdToDelete);
      this.closeConfirmDeleteModal();
    }
  }
}
