import { Injectable, signal, computed } from '@angular/core';
import { AuthInterface } from './interface/auth.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {
    private user = signal<AuthInterface | null>(null);
    private isAuthenticatedSignal = computed(() => this.user() !== null);

    setUser(user: AuthInterface): void {
        this.user.set(user);
    }

    getUser(): AuthInterface | null {
        return this.user();
    }

    clearUser(): void {
        this.user.set(null);
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSignal();
    }

    getAuthStatus(): boolean {
        return this.isAuthenticatedSignal();
    }

    getUserId(): number | null {
        const user = this.user();
        return user ? user.id! : null;
    }
}