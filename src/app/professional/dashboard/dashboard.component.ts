import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // Importer RouterOutlet
import { CommonModule } from '@angular/common';  // Importer CommonModule

@Component({
  selector: 'app-professional-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,  // Indiquer que ce composant est standalone
  imports: [CommonModule, RouterOutlet]  // Ajouter RouterOutlet ici
})
export class ProfessionalDashboardComponent {
  constructor() {}
}
