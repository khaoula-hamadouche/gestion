import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ClientDashboardComponent } from './client/dashboard/dashboard.component';  // Utiliser ClientDashboardComponent
import { ProfessionalDashboardComponent } from './professional/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { appRoutes } from './app.routes';  // Import des routes
import { AvailabilityComponent } from './professional/availability/availability.component';
import { ProfessionalAppointmentsComponent } from './professional/appointments/appointments.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, LoginComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion';

  constructor(private router: Router) {
    this.router.resetConfig(appRoutes);  // Appliquer les routes dans le routeur
  }
}
