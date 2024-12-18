import { Component, OnInit } from '@angular/core'; // Import nécessaire
import { DataService } from '../../services/data.service'; // Chemin correct pour DataService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class ClientAppointmentsComponent implements OnInit {
  availableTimes: { date: string; time: string }[] = []; // Typage des créneaux disponibles
  selectedDate: string = ''; // Date sélectionnée
  selectedTime: string = ''; // Heure sélectionnée
  clientAppointments: { date: string; time: string; status: string }[] = []; // Liste des rendez-vous
  clientEmail: string = 'client@example.com'; // Email du client
  errorMessage: string | null = null; // Propriété pour les messages d'erreur

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.clientAppointments = this.dataService.getClientAppointments(this.clientEmail);
  }

  loadAvailableTimes(): void {
    if (this.selectedDate) {
      this.availableTimes = this.dataService
        .getAvailabilities()
        .filter(
          (avail: { date: string; time: string; available: boolean }) =>
            avail.date === this.selectedDate && avail.available
        );
      this.errorMessage = this.availableTimes.length === 0 ? 'Aucune disponibilité pour cette date.' : null;
    }
  }

  bookAppointment(): void {
    if (this.selectedDate && this.selectedTime) {
      const newAppointment = {
        date: this.selectedDate,
        time: this.selectedTime,
        professionalEmail: 'pro@example.com',
        clientEmail: this.clientEmail,
      };

      const success = this.dataService.bookAppointment(newAppointment);
      if (success) {
        alert('Rendez-vous réservé ! En attente de confirmation.');
        this.clientAppointments.push({ ...newAppointment, status: 'en attente' });
        this.errorMessage = null;
      } else {
        this.errorMessage = 'Ce créneau est déjà réservé ou indisponible.';
      }
    } else {
      this.errorMessage = 'Veuillez sélectionner une date et une heure.';
    }
  }

  cancelAppointment(index: number): void {
    if (confirm('Voulez-vous vraiment annuler ce rendez-vous ?')) {
      const appointment = this.clientAppointments[index];
      this.clientAppointments.splice(index, 1);
      this.dataService.cancelClientAppointment(
        this.clientEmail,
        appointment.date,
        appointment.time
      );
    }
  }

 getStatusClass(status: string): string {
   const statusClasses: { [key: string]: string } = {
     'en attente': 'status-pending',
     confirmé: 'status-confirmed',
     annulé: 'status-cancelled',
   };
   return statusClasses[status] || ''; // Retourne une chaîne vide par défaut
 }

}
