import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { MeComponent } from './features/me/me.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EventosComponent } from './features/eventos/eventos.component';
import { EstadisticasComponent } from './features/estadisticas/estadisticas.component';
import { ReportesComponent } from './features/reportes/reportes.component';
import { LandingComponent } from './shared/landing/landing.component';
import { LayoutuserComponent } from './shared/usuarios/layoutuser/layoutuser.component';
import { EventosuserComponent } from './features/usuarios/eventos/eventosuser.component';
import { ReservauserComponent } from './features/usuarios/reservas/reservauser.component';
import { PerfiluserComponent } from './features/usuarios/perfil/perfiluser.component';
import { LoginuserComponent } from './features/usuarios/auth/login/loginuser.component';
import { RegisteruserComponent } from './features/usuarios/auth/register/registeruser.component';
import { UserGuard } from './core/guards/user.guard';

export const routes: Routes = [
    // La primera parte de las rutas deben llevar a la landing page de la aplicación
    {
        path: '',
        component: LandingComponent,
        title: 'EventReserva', // Título de la página principal
    },
    {
        path: 'loginUser',
        component: LoginuserComponent,
        title: 'Login'
    },
    {
        path: 'registerUser',
        component: RegisteruserComponent,
        title: 'Register'
    },
    {
        path: 'layaoutuser',
        component: LayoutuserComponent,
        title: 'Dashboard',
        children: [
            {
                path: 'eventos',
                component: EventosuserComponent,
                title: 'Eventos',
            },
            {
                path: 'reservas',
                component: ReservauserComponent,
                title: 'Reservas',

            },
            {
                path: 'perfil',
                component: PerfiluserComponent,
                title: 'Perfil',
            },
            {
                path: '',
                redirectTo: 'eventos',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'eventos',
            }
        ],
        canActivateChild: [UserGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login',

    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
    },
    {
        path: 'layout',
        component: LayoutComponent,
        title: 'Dashboard',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                title: 'Dashboard',
            },
            {
                path: 'me',
                component: MeComponent,
                title: 'Me',
            },
            {
                path: 'eventos',
                component: EventosComponent,
                title: 'Eventos',
            },
            {
                path: 'estadisticas',
                component: EstadisticasComponent,
                title: 'Estadisticas',
            },
            {
                path: 'reportes',
                component: ReportesComponent,
                title: 'Reportes',
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            }
        ],
        canActivateChild: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: '',
    }
];
