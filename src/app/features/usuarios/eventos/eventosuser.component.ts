import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { USUARIO_EVENTOS_STORE } from './store/eventos.store';
import { DatePipe } from '@angular/common';
import { Reserva } from './interfaces/reservas.interface';
import { AuthService } from '../../../core/services/auth.service';
import { Me } from '../../../core/services/interface/auth.interface';
import { AlertComponent } from '../../alert/alert.component';
import { CreateEvent } from '../../eventos/interfaces/eventos.interface';
import { EventoUserService } from './services/eventoUser.service';
import { RESERVA_STORE } from '../reservas/store/reserva.store';

@Component({
  selector: 'app-eventosuser',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, AlertComponent],
  templateUrl: './eventosuser.component.html',
  styleUrls: ['./eventosuser.component.css']
})
export class EventosuserComponent implements OnInit {
  private eventosStore = inject(USUARIO_EVENTOS_STORE);
  private reservasStore = inject(RESERVA_STORE);
  private authService: AuthService = inject(AuthService);
  private eventoService: EventoUserService = inject(EventoUserService);
  eventos = this.eventosStore.eventos;
  loading = this.eventosStore.loading;
  error = this.eventosStore.error;
  alertMessage: string = '';
  alertType: 'success' | 'error' | 'warning' | 'info' = 'info';
  me: Me = {
    id: 0,
    nombre: '',
    email: '',
    password: '',
    rol: '',
  };
  arrayEventos: CreateEvent[] = [];
  capacidades: { [eventoId: number]: number } = {};
  loadingReservas: { [eventoId: number]: boolean } = {};


  // constructor() {
  //   if(this.eventos().length == 0) {
  //     this.eventosStore.loadEvents();
  //     console.log("Cargando eventos");
  //     effect(() => {
  //       if(this.eventos().length !== 0){
  //         this.arrayEventos = this.eventos();
  //         this.arrayEventos.forEach(evento => {
  //           // console.log(evento);
  //           this.eventosStore.getCapacidad(evento.id ?? 0);

  //           if(this.eventosStore.capacidad() !== null){
  //             // console.log(this.eventosStore.capacidad());
  //             this.capacidades[evento.id ?? 0] = this.eventosStore.capacidad()[evento.id ?? 0] ?? 0;
  //           }
            
  //           // if (evento.id != null) {
  //           //   this.eventosStore.getCapacidad(evento.id);
  //           //   this.capacidades[evento.id] = this.eventosStore.capacidad()[evento.id] ?? 0;
  //           // }
  //         })
  //       }
        
  //     });
      
  //   }
  // }

  ngOnInit(): void {
    this.eventosStore.loadEvents();
    this.userMe();
  }
  
  userMe() {
    this.authService.me().subscribe({
      next: response => {
        this.me = response;
      },
      error: error => {
        console.log(error.error.message)
      }
    })
  }

  reservar(eventoId: number): void {
    const reserva: Reserva = {
      usuario_id: this.me.id ?? 0,
      evento_id: eventoId,
      estado: 'pendiente'
    };

    this.eventosStore.reserEvent(reserva).subscribe({
      next: (response: Reserva | null) => {
        if (response) {
          this.alertMessage = 'Para confirmar su reserva dirijase al panel de Reservas!';
          this.alertType = 'success';
          // Refresh events and reservations
          this.eventosStore.clearState();
          this.eventosStore.loadEvents();
          this.reservasStore.clearState();
          this.reservasStore.loadReservas(this.me.id ?? 0);
          // Clear the alert after 3 seconds
          setTimeout(() => {
            this.alertMessage = '';
          }, 3000);
          
        }
      },
      error: (error: any) => {
        this.alertMessage = 'Error al realizar la reserva: ' + (error.error?.message || 'Error desconocido');
        this.alertType = 'error';
        // Clear the alert after 3 seconds
        setTimeout(() => {
          this.alertMessage = '';
        }, 3000);
      }
    });
  }
}

// reservar(eventoId: number): void {
//   const reserva: Reserva = {
//     usuario_id: this.me.id ?? 0,
//     evento_id: eventoId,
//     estado: 'pendiente'
//   };

//   this.eventosStore.reserEvent(reserva).subscribe({
//     next: (response: Reserva | null) => {
//       if (response) {
//         this.alertMessage = 'Para confirmar su reserva dirijase al panel de Reservas!';
//         this.alertType = 'success';
//         // Clear the alert after 3 seconds
//         setTimeout(() => {
//           this.alertMessage = '';
//         }, 3000);
//         // Refresh events and reservations
//         this.eventosStore.clearState();
//         this.eventosStore.loadEvents();
//         this.reservasStore.clearState();
//         this.reservasStore.loadReservas(this.me.id ?? 0);
//       }
//     },
//     error: (error: any) => {
//       this.alertMessage = 'Error al realizar la reserva: ' + (error.error?.message || 'Error desconocido');
//       this.alertType = 'error';
//       // Clear the alert after 3 seconds
//       setTimeout(() => {
//         this.alertMessage = '';
//       }, 3000);
//     }
//   });
// }
// }