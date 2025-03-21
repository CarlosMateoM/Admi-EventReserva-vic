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

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        title: 'Login',

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
        redirectTo: 'login',
    }
];
