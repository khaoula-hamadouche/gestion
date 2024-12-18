import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importer RouterModule
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css'],
  standalone: true, // Indiquer que ce composant est standalone
  imports: [CommonModule, RouterModule, FormsModule] // Ajouter les modules nécessaires
})
export class AvailabilityComponent {
  availabilities: { date: string; time: string; available: boolean; professionalEmail: string }[] = [];
  newAvailability = { date: '', time: '', available: true, professionalEmail: 'pro@example.com' };

  constructor(private dataService: DataService) {
    this.availabilities = this.dataService.getAvailabilities();
  }

  // Basculer la disponibilité entre Disponible et Indisponible
  toggleAvailability(index: number) {
    this.availabilities[index].available = !this.availabilities[index].available;
    this.dataService.updateAvailabilities(this.availabilities);
  }

  // Ajouter une nouvelle disponibilité
  addAvailability() {
    if (this.newAvailability.date && this.newAvailability.time) {
      this.dataService.addAvailability(this.newAvailability);
      this.availabilities = this.dataService.getAvailabilities();
      this.newAvailability = { date: '', time: '', available: true, professionalEmail: 'pro@example.com' };
    } else {
      alert('Veuillez entrer une date et une heure valides.');
    }
  }

  // Modifier une disponibilité existante
  editAvailability(index: number) {
    const updatedAvailability = { ...this.availabilities[index] };
    const date = prompt('Entrez la nouvelle date', updatedAvailability.date);
    const time = prompt('Entrez la nouvelle heure', updatedAvailability.time);
    const available = confirm('Est-ce disponible ?');

    if (date && time) {
      updatedAvailability.date = date;
      updatedAvailability.time = time;
      updatedAvailability.available = available;
      updatedAvailability.professionalEmail = updatedAvailability.professionalEmail || 'pro@example.com';

      this.availabilities[index] = updatedAvailability;
      this.dataService.updateAvailabilities(this.availabilities);
    }
  }

  // Supprimer une disponibilité existante
  deleteAvailability(index: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette disponibilité ?')) {
      this.dataService.deleteAvailability(index);
      this.availabilities = this.dataService.getAvailabilities();
    }
  }
}
