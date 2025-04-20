import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Reserva } from "../interfaces/reservas.interface";
import { ReservasService } from "../services/reservas.service";
import { inject } from "@angular/core";
import { catchError, finalize, of, tap } from "rxjs";

export interface ReservaState {
    reservas: Reserva[];
    loading: boolean;
    error: string;
    userId: number | null;

}

export const initialState: ReservaState = {
    reservas: [],
    loading: false,
    error: '',
    userId: null,
};

export const RESERVA_STORE = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => {
            const reservasService = inject(ReservasService);
            return {
               // Cargar las reservas
               loadReservas: (id: number) => {
                // Si ya hay datos para este usuario, no cargar de nuevo
                if (store.userId() === id && store.reservas().length > 0) {
                    return;
                }
                patchState(store, { loading: true, error: '', userId: id });
                reservasService.getReservasByUsuario(id)
                    .pipe(
                        catchError(error => {
                            patchState(store, { 
                                error: 'Error al cargar las reservas: ' + (error.message || 'Error desconocido'),
                                loading: false 
                            });
                            return of([]);
                        }),
                        finalize(() => patchState(store, { loading: false }))
                    )
                    .subscribe({
                        next: (reservas) => patchState(store, { reservas }),
                    });
                },
               // Actualizar una reserva
                updateReserva: (reserva: Reserva) => {
                    patchState(store, { loading: true, error: '' });
                    const currentReservas = store.reservas();
                    const updatedReservas = currentReservas.map((r: Reserva) => 
                        r.id === reserva.id ? { ...r, estado: reserva.estado } : r
                    );
                    patchState(store, { reservas: updatedReservas });
                    return reservasService.updateReserva(reserva)
                        .pipe(
                            catchError(error => {
                                patchState(store, { 
                                    error: 'Error al actualizar la reserva: ' + (error.message || 'Error desconocido'),
                                    loading: false 
                                });
                                return of(null);
                            }),
                            finalize(() => patchState(store, { loading: false }))
                        );
                },
                // limpiar el estado 
                clearState: () => {
                    patchState(store, { reservas: [], loading: false, error: '', userId: null });
                }
            }
        })
)