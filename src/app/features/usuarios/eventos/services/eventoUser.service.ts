import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateEvent } from '../../../eventos/interfaces/eventos.interface';
import { Reserva } from '../interfaces/reservas.interface';

@Injectable({
    providedIn: 'root'
})
export class EventoUserService {
    private readonly API_URL = environment.apiUrl;
    private http: HttpClient = inject(HttpClient);

    getEvents(): Observable<CreateEvent[]> {
        return this.http.get<CreateEvent[]>(`${this.API_URL}/eventos`);
    }

    reservarEvento(reserva: Reserva): Observable<Reserva> {
        return this.http.post<Reserva>(`${this.API_URL}/reservas`, reserva);
    }

    getCapacidad(id: number): Observable<number> {
        return this.http.get<number>(`${this.API_URL}/eventos/${id}/capacidad`);
    }
}
