import { patchState, signalStore, withState, withMethods, WritableStateSource } from "@ngrx/signals";
import { AuthInterface, Me } from "../services/interface/auth.interface";
import { AuthStateService } from "../services/auth-state.service";
import { Observable, of } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { Signal } from '@angular/core';
import { inject } from '@angular/core';

export interface AuthUserState {
    user: AuthInterface | null;
    loading: boolean;
    error: string | null;
}

export interface AuthUserStore {
    user: Signal<AuthInterface | null>;
    loading: Signal<boolean>;
    error: Signal<string | null>;
    loadUser: () => Observable<AuthInterface | null>;
    logout: () => void;
    updateUser: (user: Me) => Observable<Me>;
}

export const initialState: AuthUserState = {
    user: null,
    loading: false,
    error: null
};

export const AUTH_USER_STORE = signalStore(
    withState<AuthUserState>(initialState),
    withMethods((store: WritableStateSource<AuthUserState>) => {
        const authStateService = inject(AuthStateService);
        return {
            loadUser: () => {
                patchState(store, { loading: true, error: null });
                const user = authStateService.getUser();
                if (user) {
                    patchState(store, { 
                        user,
                        loading: false,
                        error: null
                    });
                    return of(user);
                }
                return of(null).pipe(
                    catchError((error) => {
                        patchState(store, { 
                            error: 'Error al cargar el usuario: ' + (error.message || 'Error desconocido'),
                            loading: false 
                        });
                        return of(null);
                    }),
                    finalize(() => patchState(store, { loading: false })),
                    tap((user: AuthInterface | null) => patchState(store, { user }))
                );
            },
            logout: () => {
                patchState(store, { user: null, error: null });
                authStateService.clearUser();
            },
            updateUser: (user: Me) => {
                patchState(store, { user });
                authStateService.setUser(user);
            }
        };
    })
);
