import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ClientDashboardComponent } from './client/dashboard/dashboard.component';
import { ProfessionalDashboardComponent } from './professional/dashboard/dashboard.component';
import { AvailabilityComponent } from './professional/availability/availability.component';
import { ClientAppointmentsComponent } from './client/appointments/appointments.component';
import { ProfessionalAppointmentsComponent } from './professional/appointments/appointments.component';

export const appRoutes: Routes = [
  // Authentification
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },

  // Tableau de bord client
  { path: 'dashboard-client', component: ClientDashboardComponent },
  { path: 'client-appointments', component: ClientAppointmentsComponent },
  // Tableau de bord professionnel
  {
    path: 'dashboard-professional',
    component: ProfessionalDashboardComponent,
    children: [
      { path: 'availability', component: AvailabilityComponent }, // Gérer les disponibilités
      { path: 'appointments', component: ProfessionalAppointmentsComponent } // Gérer les rendez-vous
    ]
  },

  // Redirection par défaut
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // Page par défaut
  { path: '**', redirectTo: 'auth/login' } // Routes non trouvées
];
