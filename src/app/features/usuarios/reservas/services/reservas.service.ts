import { Injectable } from "@angular/core";
import { environment } from "../../../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { inject } from "@angular/core";
import { Reserva, UpdateReserva } from "../interfaces/reservas.interface";

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
    private readonly API_URL = environment.apiUrl;
    private http: HttpClient = inject(HttpClient);

    getReservasByUsuario(usuarioId: number): Observable<Reserva[]> {
        return this.http.get<Reserva[]>(`${this.API_URL}/reservas/usuario/${usuarioId}`);
    }

    updateReserva(reserva: UpdateReserva): Observable<Reserva> {
      return this.http.put<Reserva>(`${this.API_URL}/reservas/${reserva.id}`, {estado: reserva.estado});
    }
}
