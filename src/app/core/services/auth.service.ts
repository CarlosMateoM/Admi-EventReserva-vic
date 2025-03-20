import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { AuthInterface, UserLogin } from './interface/auth.interface';
import { map, Observable, tap } from 'rxjs';
import { UserStateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  private userStateService: UserStateService = inject(UserStateService);


  createUser(user: AuthInterface): Observable<{ user: AuthInterface, message: string }> {
    return this.http.post<{ user: AuthInterface, message: string }>(`${this.API_URL}/register`, user).pipe(
      map(response => { return response })
    )
  }

  login(user: UserLogin): Observable<{ token: string, usuario: { id: number, nombre: string, email: string, rol: string } }> {
    return this.http.post<{ token: string, usuario: { id: number, nombre: string, email: string, rol: string } }>(`${this.API_URL}/login`, user).pipe(
      map(response => response)
    );
  }

  me(): Observable<AuthInterface> {
    return this.http.get<AuthInterface>(`${this.API_URL}/me`).pipe(
      tap((user: AuthInterface) => {
        this.userStateService.setUser(user); // Guarda el usuario en el estado
      })
    );
  }


  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userStateService.clearUser();
  }
}
