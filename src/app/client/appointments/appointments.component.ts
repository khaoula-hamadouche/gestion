import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-client-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class ClientAppointmentsComponent implements OnInit {
  availableTimes: { date: string; time: string }[] = [];
  selectedDate: string = '';
  selectedTime: string = '';
  clientAppointments: { date: string; time: string; status: string }[] = [];
  clientEmail: string = 'client@example.com';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.clientAppointments = this.dataService.getClientAppointments(this.clientEmail);
    this.loadAvailableTimes();
  }

  loadAvailableTimes() {
    this.availableTimes = [
      { date: '2024-12-06', time: '09:00' },
      { date: '2024-12-06', time: '11:00' },
    ];
  }

  bookAppointment() {
    if (this.selectedDate && this.selectedTime) {
      const newAppointment = {
        date: this.selectedDate,
        time: this.selectedTime,
        professionalEmail: 'pro@example.com',  // Par défaut, un professionnel est assigné
        clientEmail: this.clientEmail,
      };

      const success = this.dataService.bookAppointment(newAppointment);
      if (success) {
        alert('Rendez-vous réservé ! En attente de confirmation.');
        this.clientAppointments.push({ ...newAppointment, status: 'en attente' });
      } else {
        alert('Ce créneau est déjà réservé ou indisponible.');
      }
    } else {
      alert('Veuillez sélectionner une date et une heure.');
    }
  }

  cancelAppointment(index: number) {
    if (confirm('Voulez-vous vraiment annuler ce rendez-vous ?')) {
      const appointment = this.clientAppointments[index];
      this.clientAppointments.splice(index, 1);
      this.dataService.cancelClientAppointment(this.clientEmail, appointment.date, appointment.time);
    }
  }
}
