import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthInterface } from '../services/interface/auth.interface';

@Injectable({
    providedIn: 'root'
})
export class UserStateService {
    private userSubject = new BehaviorSubject<AuthInterface | null>(null);

    // Observable para que los componentes puedan suscribirse
    user$: Observable<AuthInterface | null> = this.userSubject.asObservable();

    // Establece el usuario en el estado
    setUser(user: AuthInterface): void {
        this.userSubject.next(user);
    }

    // Obtiene el usuario actual del estado
    getUser(): AuthInterface | null {
        return this.userSubject.value;
    }

    // Limpia el estado del usuario (por ejemplo, al cerrar sesión)
    clearUser(): void {
        this.userSubject.next(null);
    }
}