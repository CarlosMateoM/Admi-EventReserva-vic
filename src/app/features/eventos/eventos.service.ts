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
        return this.http.post<{ event: CreateEvent, message: string }>(`${this.API_URL}/eventos`, event)
    }

    getEvents(): Observable<CreateEvent[]> {
        return this.http.get<CreateEvent[]>(`${this.API_URL}/eventos`)
    }

    updateEvent(event: Partial<CreateEvent>): Observable<{ event: CreateEvent, message: string }> {
        return this.http.put<{ event: CreateEvent, message: string }>(`${this.API_URL}/eventos/${event.id}`, event)
    }

    deleteEvent(id: number): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.API_URL}/eventos/${id}`)
    }

}
