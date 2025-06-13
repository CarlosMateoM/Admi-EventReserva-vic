import { inject, Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateEvent } from "../eventos/interfaces/eventos.interface";

// Interfaces para los reportes
export interface Reserva {
    id: number;
    usuario_id: number;
    evento_id: number;
    estado: string;
    created_at: string;
    updated_at: string;
}

export interface ReservasPorEventoResponse {
    evento: string;
    total_reservas: number;
    reservas: Reserva[];
}

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private readonly API_URL = environment.apiUrl;
    private http: HttpClient = inject(HttpClient);

    // Obtener todos los eventos
    getEvents(): Observable<CreateEvent[]> {
        return this.http.get<CreateEvent[]>(`${this.API_URL}/eventos`);
    }

    // Reporte de reservas por evento
    getReservasByEvent(reservaId: number): Observable<ReservasPorEventoResponse> {
        return this.http.get<ReservasPorEventoResponse>(`${this.API_URL}/reportes/reservas/${reservaId}`);
    }

    // Exportar reporte a CSV
    exportReportToCSV(tipo: string, id?: number): Observable<Blob> {
        const url = `${this.API_URL}/reportes/exportar/${tipo}/${id || ''}`;
        return this.http.get(url, {
            responseType: 'blob'
        });
    }
}
