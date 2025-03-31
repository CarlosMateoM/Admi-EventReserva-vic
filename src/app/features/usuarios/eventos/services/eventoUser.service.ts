import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateEvent } from '../../../eventos/interfaces/eventos.interface';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private readonly API_URL = environment.apiUrl;
    private http: HttpClient = inject(HttpClient);

    getEvents(): Observable<CreateEvent[]> {
        return this.http.get<CreateEvent[]>(`${this.API_URL}/eventos`)
    }


}
