// eventos.store.ts
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { finalize, mergeMap, of, catchError, tap } from "rxjs";
import { inject } from "@angular/core";
import { EventService } from "../eventos.service";
import { CreateEvent } from "../interfaces/eventos.interface";

// Define la interfaz del estado de eventos
export interface EventosState {
    eventos: CreateEvent[];
    loading: boolean;
    error: string;
}

// Estado inicial
const initialState: EventosState = {
    eventos: [],
    loading: false,
    error: ''
};

// Se crea el store de eventos
export const EVENTOS_STORE = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => {
        const eventService = inject(EventService);
        return {
            // Carga los eventos desde la API
            loadEvents: (forceReload: boolean = false) => {
                // Si ya tenemos eventos y no se fuerza la recarga, no hacemos nada
                if (store.eventos().length > 0 && !forceReload) {
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
                        next: (events) => {
                            patchState(store, { eventos: events });
                        }
                    });
            },

            // Crea un nuevo evento
            createEvent: (nuevoEvento: CreateEvent) => {
                patchState(store, { loading: true, error: '' });
                
                return eventService.createEvent(nuevoEvento)
                    .pipe(
                        tap(response => {
                            console.log('Respuesta del servidor:', response);
                            // Verificar la estructura de la respuesta
                            if (!response) {
                                throw new Error('No se recibió respuesta del servidor');
                            }
                            if (!response.event) {
                                throw new Error('La respuesta no contiene el evento creado');
                            }
                            // Verificar que el evento tenga las propiedades necesarias
                            const requiredProps = ['titulo', 'descripcion', 'fecha_inicio', 'fecha_fin', 'capacidad'];
                            const missingProps = requiredProps.filter(prop => !(prop in response.event));
                            if (missingProps.length > 0) {
                                throw new Error(`El evento no tiene las propiedades requeridas: ${missingProps.join(', ')}`);
                            }
                        }),
                        catchError(error => {
                            console.error('Error al crear evento:', error);
                            patchState(store, { 
                                error: 'Error al crear el evento: ' + (error.message || 'Error desconocido'),
                                loading: false 
                            });
                            throw error;
                        }),
                        finalize(() => patchState(store, { loading: false }))
                    )
                    .subscribe({
                        next: (response) => {
                            const currentEvents = store.eventos();
                            patchState(store, { 
                                eventos: [response.event, ...currentEvents],
                                error: ''
                            });
                        }
                    });
            },

            // Actualiza un evento
            updateEvent: (evento: Partial<CreateEvent>) => {
                patchState(store, { loading: true, error: '' });
                
                eventService.updateEvent(evento)
                    .pipe(
                        tap(response => {
                            console.log('Respuesta de actualización:', response);
                        }),
                        catchError(error => {
                            console.error('Error al actualizar evento:', error);
                            patchState(store, { 
                                error: 'Error al actualizar el evento: ' + (error.message || 'Error desconocido'),
                                loading: false 
                            });
                            throw error;
                        }),
                        finalize(() => patchState(store, { loading: false }))
                    )
                    .subscribe({
                        next: (response) => {
                            if (response && response.event) {
                                const updatedEvents = store.eventos().map(ev =>
                                    ev.id === response.event.id ? response.event : ev
                                );
                                patchState(store, { eventos: updatedEvents, error: '' });
                            } else {
                                console.error('Respuesta inesperada al actualizar evento:', response);
                                patchState(store, {
                                    error: 'Error: Respuesta inesperada del servidor'
                                });
                            }
                        }
                    });
            },

            // Elimina un evento
            deleteEvent: (id: number) => {
                patchState(store, { loading: true, error: '' });
                
                eventService.deleteEvent(id)
                    .pipe(
                        catchError(error => {
                            patchState(store, { 
                                error: 'Error al eliminar el evento: ' + (error.message || 'Error desconocido'),
                                loading: false 
                            });
                            throw error;
                        }),
                        finalize(() => patchState(store, { loading: false }))
                    )
                    .subscribe({
                        next: () => {
                            const filteredEvents = store.eventos().filter(ev => ev.id !== id);
                            patchState(store, { eventos: filteredEvents, error: '' });
                        }
                    });
            }
        };
    })
);
