import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importer Router pour la navigation

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class ClientDashboardComponent {
  constructor(private router: Router) {}

  // Méthode pour naviguer vers les rendez-vous
  navigateToAppointments() {
    this.router.navigate(['client-appointments']);
  }
}
