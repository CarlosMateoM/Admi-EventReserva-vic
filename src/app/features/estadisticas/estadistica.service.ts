import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EstadisticaEvento {
    evento_id: number;
    evento: string;
    total: number;
}

@Injectable({
    providedIn: 'root'
})
export class EstadisticaService {
    private readonly API_URL = environment.apiUrl;
    private http: HttpClient = inject(HttpClient);

    getEstadisticas(data: string): Observable<EstadisticaEvento[]> {
        return this.http.get<EstadisticaEvento[]>(`${this.API_URL}/reporte/reservas-por-fecha/${data}`);
    }
}