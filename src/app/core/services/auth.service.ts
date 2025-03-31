import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { AuthInterface, Me, UserLogin } from './interface/auth.interface';
import { map, Observable, tap } from 'rxjs';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  private authStateService: AuthStateService = inject(AuthStateService);

  createUser(user: AuthInterface): Observable<{ user: AuthInterface, message: string }> {
    return this.http.post<{ user: AuthInterface, message: string }>(`${this.API_URL}/register`, user).pipe(
      map(response => { return response })
    )
  }

  login(user: UserLogin): Observable<{ token: string, usuario: AuthInterface }> {
    return this.http.post<{ token: string, usuario: AuthInterface }>(`${this.API_URL}/login`, user).pipe(
      tap(response => {
        this.setToken(response.token);
        this.authStateService.setUser(response.usuario);
      })
    );
  }

  me(): Observable<AuthInterface> {
    return this.http.get<AuthInterface>(`${this.API_URL}/me`).pipe(
      tap((user: AuthInterface) => {
        this.authStateService.setUser(user); // Guarda el usuario en el estado
      })
    );
  }

  updateUser(user: Me): Observable<Me> {
    return this.http.put<Me>(`${this.API_URL}/usuarios/${user.id}`, user).pipe(
      tap((user: Me) => {
        this.authStateService.setUser(user); // Actualiza el usuario en el estado
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
    this.authStateService.clearUser();
  }
}
