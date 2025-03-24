// eventos.store.ts
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { finalize, mergeMap, of } from "rxjs";
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
            loadEvents: () => {
                if (store.eventos().length > 0) {
                    // Ya tenemos eventos, no volvemos a hacer la petición
                    return;
                }
                of(patchState(store, { loading: true }))
                    .pipe(
                        mergeMap(() => eventService.getEvents()),
                        finalize(() => patchState(store, { loading: false }))
                    )
                    .subscribe((data) => {
                        patchState(store, { eventos: data });
                    });
            },

            // Crea un nuevo evento. La API retorna { event, message }.
            createEvent: (nuevoEvento: CreateEvent) => {
                of(patchState(store, { loading: true }))
                    .pipe(
                        mergeMap(() => eventService.createEvent(nuevoEvento)),
                        finalize(() => patchState(store, { loading: false }))
                    )
                    .subscribe((resp: any) => {
                        console.log('Respuesta al crear evento:', resp);
                        // Asegúrate de extraer el objeto correcto de la respuesta
                        const createdEvent = resp.event || resp.eventos || resp; // Ajusta según la forma real
                        const currentEvents = store.eventos();
                        patchState(store, { eventos: [...currentEvents, createdEvent] });
                    });
            },


            // Actualiza un evento. La API retorna { event, message }.
            updateEvent: (evento: Partial<CreateEvent>) => {
                of(patchState(store, { loading: true }))
                    .pipe(
                        mergeMap(() => eventService.updateEvent(evento)),
                        finalize(() => patchState(store, { loading: false }))
                    )
                    .subscribe((resp: any) => {
                        // Si resp.event existe, usamos eso, sino asumimos que resp es el evento actualizado
                        const updatedEvent = resp.event || resp;
                        const updatedEvents = store.eventos().map(ev =>
                            ev.id === updatedEvent.id ? updatedEvent : ev
                        );
                        patchState(store, { eventos: updatedEvents });
                    });
            },


            // Elimina un evento. La API retorna { message }.
            deleteEvent: (id: number) => {
                of(patchState(store, { loading: true }))
                    .pipe(
                        mergeMap(() => eventService.deleteEvent(id)),
                        finalize(() => patchState(store, { loading: false }))
                    )
                    .subscribe(() => {
                        const filteredEvents = store.eventos().filter(ev => ev.id !== id);
                        patchState(store, { eventos: filteredEvents });
                    });
            },
        };
    })
);
