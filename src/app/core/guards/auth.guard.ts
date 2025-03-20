// auth.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);


    canActivate(): boolean {
        if (this.authService.getToken()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    canActivateChild(): boolean {
        return this.canActivate();
    }
}
