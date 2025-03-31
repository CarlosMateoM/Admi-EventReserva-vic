import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { CreateEvent } from './interfaces/eventos.interface';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private readonly API_URL = environment.apiUrl;
    private http: HttpClient = inject(HttpClient);

    createEvent(event: CreateEvent): Observable<{ event: CreateEvent, message: string }> {
        return this.http.post<any>(`${this.API_URL}/eventos`, event)
            .pipe(
                tap(response => console.log('Respuesta cruda del servidor:', response)),
                map(response => {
                    // La API devuelve { eventos: CreateEvent, message: string }
                    if (response && response.eventos) {
                        return {
                            event: response.eventos, // Mapear 'eventos' a 'event'
                            message: response.message || 'Evento creado exitosamente'
                        };
                    }
                    throw new Error('Formato de respuesta no reconocido');
                })
            );
    }

    getEvents(): Observable<CreateEvent[]> {
        return this.http.get<CreateEvent[]>(`${this.API_URL}/eventos`);
    }

    updateEvent(event: Partial<CreateEvent>): Observable<{ event: CreateEvent, message: string }> {
        return this.http.put<CreateEvent>(`${this.API_URL}/eventos/${event.id}`, event)
            .pipe(
                map(response => ({
                    event: response,
                    message: 'Evento actualizado exitosamente'
                }))
            );
    }

    deleteEvent(id: number): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.API_URL}/eventos/${id}`);
    }
}
