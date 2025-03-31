import { Injectable, signal } from '@angular/core';
import { AuthInterface } from './interface/auth.interface';


@Injectable({
    providedIn: 'root'
})
export class AuthStateService {
    private user = signal<AuthInterface | null>(null);

    setUser(user: AuthInterface): void {
        this.user.set(user);
    }

    getUser(): AuthInterface | null {
        return this.user();
    }

    clearUser(): void {
        this.user.set(null);
    }
}
