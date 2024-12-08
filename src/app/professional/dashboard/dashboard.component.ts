import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professional-dashboard',
  standalone: true, // Nécessaire avec les imports
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class ProfessionalDashboardComponent {
   constructor(private router: Router) {}

    // Méthode pour naviguer vers les rendez-vous
    navigateToAppointments() {
      this.router.navigate(['appointments'], { relativeTo: this.router.routerState.root });
    }

    navigateToAvailability() {
        this.router.navigate(['availability'], { relativeTo: this.router.routerState.root });
    }
}
