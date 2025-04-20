import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { Reserva } from './interfaces/reservas.interface';
import { Subject } from 'rxjs';
import { RESERVA_STORE } from './store/reserva.store';
import { AuthInterface } from '../../../core/services/interface/auth.interface';

@Component({
  selector: 'app-reservauser',
  imports: [CommonModule],
  templateUrl: './reservauser.component.html',
  styleUrls: ['./reservauser.component.css']
})

export class ReservauserComponent implements OnInit {
  private authStateService = inject(AuthStateService);
  private reservasStore = inject(RESERVA_STORE);
  private authService: AuthService = inject(AuthService);
  private readonly destroy$ = new Subject<void>();
  user: AuthInterface | null = null;
  reservass = this.reservasStore.reservas;

  // Usar las señales del store directamente
  get reservas() {
    return this.reservasStore.reservas();
  }

  get loading() {
    return this.reservasStore.loading;
  }

  get error() {
    return this.reservasStore.error();
  }

  get isAuthenticated(): boolean {
    return this.authStateService.isAuthenticated();
  }

  ngOnInit(): void {
    this.user = this.authStateService.getUser();
    this.reservasStore.loadReservas(this.user?.id ?? 0);

    if(this.user == null){
      this.authService.userMe().subscribe(response => {
        this.authStateService.setUser(response);
        this.user = response;
        this.reservasStore.loadReservas(response.id!);
      });
    }
    else{
      this.reservasStore.loadReservas(this.user.id!);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateReserva(id: number, estado: string): void {
    if (!this.isAuthenticated) {
      console.log('No está autenticado');
      return;
    }

    // Find the reservation in the current state
    const reservaToUpdate = this.reservas.find(reserva => reserva.id === id);
    
    if (!reservaToUpdate) {
      console.error('Reserva no encontrada');
      return;
    }

    // Create a new reservation object with the updated state
    const updatedReserva: Reserva = {
      ...reservaToUpdate,
      estado
    };

    // Update the reservation in the store
    this.reservasStore.updateReserva(updatedReserva).subscribe({
      next: (reserva) => {
        console.log('Reserva actualizada:', reserva);
      },
      error: (error) => {
        console.error('Error al actualizar la reserva:', error);
      }
    });
  }
}
