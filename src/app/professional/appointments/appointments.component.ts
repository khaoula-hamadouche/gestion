import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-professional-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class ProfessionalAppointmentsComponent implements OnInit {
  professionalAppointments: { date: string; time: string; clientEmail: string; status: string }[] = [];
  professionalEmail: string = 'pro@example.com';

  constructor(private dataService: DataService) {}

ngOnInit(): void {
  this.professionalAppointments = this.dataService.getProfessionalAppointments(this.professionalEmail);
  console.log('Rendez-vous récupérés:', this.professionalAppointments); // Débogage
}
  confirmAppointment(appointment: { date: string; time: string; clientEmail: string }) {
    this.dataService.confirmAppointment(
      appointment.date,
      appointment.time,
      this.professionalEmail,
      appointment.clientEmail
    );
    alert('Rendez-vous confirmé.');
  }

  cancelAppointment(appointment: { date: string; time: string; clientEmail: string }) {
    const success = this.dataService.cancelAppointment(
      appointment.date,
      appointment.time,
      this.professionalEmail,
      appointment.clientEmail
    );
    if (success) {
      alert('Rendez-vous annulé.');
    } else {
      alert('Impossible d\'annuler ce rendez-vous.');
    }
  }
}
