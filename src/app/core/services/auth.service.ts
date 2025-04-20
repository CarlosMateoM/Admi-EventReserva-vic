import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthInterface, Me, UpdatePassword, UserLogin } from './interface/auth.interface';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { AuthStateService } from './auth-state.service';
import { environment } from '../../enviroments/enviroment';
import { RESERVA_STORE } from '../../features/usuarios/reservas/store/reserva.store';
import { USUARIO_EVENTOS_STORE } from '../../features/usuarios/eventos/store/eventos.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private readonly TOKEN_KEY = 'auth_token';
  private http: HttpClient = inject(HttpClient);
  private authStateService: AuthStateService = inject(AuthStateService);
  private reservasStore = inject(RESERVA_STORE);
  private eventosStore = inject(USUARIO_EVENTOS_STORE);
  private _token: string | null = null;
  private currentUserSubject = new BehaviorSubject<AuthInterface | null>(null);

  constructor() {
    // Intentar recuperar el token al inicio
    try {
      const savedToken = localStorage.getItem(this.TOKEN_KEY);
      // console.log('Constructor - Token en localStorage:', savedToken);
      if (savedToken) {
        this._token = savedToken;
      }
    } catch (e) {
      console.error('Error al recuperar token en constructor:', e);
    }
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    // console.log('Headers - Token actual:', token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createUser(user: AuthInterface): Observable<{ user: AuthInterface, message: string }> {
    return this.http.post<{ user: AuthInterface, message: string }>(`${this.API_URL}/register`, user).pipe(
      map(response => { return response })
    )
  }

  login(user: UserLogin): Observable<{ token: string, usuario: AuthInterface }> {
    // console.log('[login] Iniciando con:', user);
    return this.http.post<{ token: string, usuario: AuthInterface }>(`${this.API_URL}/login`, user).pipe(
      tap(response => {
        // console.log('[login] Respuesta:', response);
        if (response?.token) {
          this.setToken(response.token);
          this.authStateService.setUser(response.usuario); // Asegurando que el usuario se establece en el estado
          this.currentUserSubject.next(response.usuario);
        } else {
          console.error('[login] No se recibió token');
        }
      })
    );
  }

  me(): Observable<AuthInterface> {
    return this.http.get<AuthInterface>(`${this.API_URL}/me`, { headers: this.getHeaders() }).pipe(
      tap(user => {
        this.authStateService.setUser(user);
        this.currentUserSubject.next(user);
      })
    );
  }

  userMe(): Observable<AuthInterface> {
    return this.http.get<AuthInterface>(`${this.API_URL}/me`, { headers: this.getHeaders() })
  }

  updateUser(user: Me): Observable<Me> {
    return this.http.put<Me>(
      `${this.API_URL}/usuarios/${user.id}`, 
      user,
      { headers: this.getHeaders() }
    ).pipe(
      tap(user => this.authStateService.setUser(user))
    );
  }

  updatePassword(data: UpdatePassword): Observable<{message: string}> {
    return this.http.put<{message: string}>(
      `${this.API_URL}/password/${data.id}`,
      {password: data.password},
      { headers: this.getHeaders() }
    );
  }

  setToken(token: string): void {
    if (!token) {
      console.error('SetToken - Token vacío');
      return;
    }

    // console.log('SetToken - Guardando token:', token);
    
    // Guardar en memoria
    this._token = token;
    // console.log('SetToken - Token guardado en memoria');

    // Guardar en localStorage
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
      // const saved = localStorage.getItem(this.TOKEN_KEY);
      // console.log('SetToken - Verificación después de guardar:', {
      //   tokenGuardado: saved,
      //   igualAlOriginal: saved === token
      // });
    } catch (e) {
      console.error('SetToken - Error al guardar en localStorage:', e);
    }
  }

  getToken(): string | null {
    // Primero intentar obtener de memoria
    if (this._token) {
      // console.log('GetToken - Retornando desde memoria:', this._token);
      return this._token;
    }

    // Si no está en memoria, intentar localStorage
    try {
      const token = localStorage.getItem(this.TOKEN_KEY);
      // console.log('GetToken - Retornando desde localStorage:', token);
      if (token) {
        this._token = token; // Actualizar memoria
      }
      return token;
    } catch (e) {
      console.error('GetToken - Error al obtener de localStorage:', e);
      return null;
    }
  }

  logout(): void {
    console.log('Logout - Limpiando token');
    this._token = null;
    try {
      localStorage.removeItem(this.TOKEN_KEY);
    } catch (e) {
      console.error('Logout - Error al limpiar localStorage:', e);
    }
    this.authStateService.clearUser();
    this.currentUserSubject.next(null);
    this.reservasStore.clearState();
    this.eventosStore.clearState();
  }

  getCurrentUser(): Observable<AuthInterface | null> {
    return this.currentUserSubject.asObservable();
  }
}
