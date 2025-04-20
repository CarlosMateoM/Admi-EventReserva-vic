import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { EventService } from "../../../eventos/eventos.service";
import { catchError, finalize, of } from "rxjs";
import { CreateEvent } from "../../../eventos/interfaces/eventos.interface";
import { Reserva } from "../interfaces/reservas.interface";
import { EventoUserService } from "../services/eventoUser.service";
import { ReservasService } from "../../reservas/services/reservas.service";

export interface EventosState {
    eventos: CreateEvent[];
    reservas: Reserva[]; // Agregamos un array para las reservas
    capacidad: { [eventoId: number]: number | null};
    loading: boolean;
    error: string;
}

// Estado inicial
const initialState: EventosState = {
    eventos: [],
    reservas: [], // Inicializamos el array de reservas
    capacidad: [],
    loading: false,
    error: ''
};

export const USUARIO_EVENTOS_STORE = signalStore(
   { providedIn: 'root' },
   withState(initialState),
   withMethods((store) => {
        const eventService = inject(EventService);
        const eventUserService = inject(EventoUserService)
        const reservasService = inject(ReservasService);
        return {
            // Carga los eventos desde la API
            loadEvents: () => {

                // Si hay datos, no carga de nuevo
                if (store.eventos().length > 0) {
                    return;
                }

                patchState(store, { loading: true, error: '' });
                
                eventService.getEvents()
                    .pipe(
                        catchError(error => {
                            patchState(store, { 
                                error: 'Error al cargar los eventos: ' + (error.message || 'Error desconocido'),
                                loading: false 
                            });
                            return of([]);
                        }),
                        finalize(() => patchState(store, { loading: false }))
                    )
                    .subscribe({
                        next: (eventos) => {
                            patchState(store, { eventos, loading: true });
                        }
                    });
            },
            getCapacidad: (id: number) => {
                patchState(store, { loading: true, error: '' });
                
                // Si hay datos, no carga de nuevo
                if (store.capacidad()[id] !== undefined) {
                    return;
                }

                return eventUserService.getCapacidad(id).pipe(
                    catchError(error => {
                        patchState(store, { 
                            error: 'Error al obtener la capacidad: ' + (error.message || 'Error desconocido'),
                            loading: false 
                        });
                        return of(null);
                    }),
                    finalize(() => patchState(store, { loading: false }))
                ).subscribe({
                    next: (capacidad) => {
                        patchState(store, { capacidad: { ...store.capacidad(), [id]: capacidad } });
                    }
                });
            },
            reserEvent: (reserva: Reserva) => {
                patchState(store, { loading: true, error: '' });
                
                return eventUserService.reservarEvento(reserva).pipe(
                    catchError(error => {
                        patchState(store, { 
                            error: 'Error al reservar evento: ' + (error.message || 'Error desconocido'),
                            loading: false 
                        });
                        return of(null);
                    }),
                    finalize(() => patchState(store, { loading: false }))
                );
            },
            getReservas: () => {
                const usuarioId = 1; // This should be replaced with actual user ID logic
                reservasService.getReservasByUsuario(usuarioId)
                    .subscribe({
                        next: (reservas) => {
                            patchState(store, { reservas });
                        },
                        error: (error) => {
                            patchState(store, { error: 'Error al cargar las reservas: ' + (error.message || 'Error desconocido') });
                            console.error('Error al cargar las reservas:', error.message);
                        }
                    });
            },
            clearState: () => {
                patchState(store, { eventos: [], loading: false, error: '', reservas: [] });
            },
            setEvents: (eventos: CreateEvent[]) => {
                patchState(store, { eventos });
            }
        }
    })
);