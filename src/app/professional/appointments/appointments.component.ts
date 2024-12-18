import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-professional-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class ProfessionalAppointmentsComponent implements OnInit {
  professionalAppointments: { date: string; time: string; status: string }[] = [];
  professionalEmail: string = 'pro@example.com';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.professionalAppointments = this.dataService.getProfessionalAppointments(this.professionalEmail);
  }

  confirmAppointment(appointment: { date: string; time: string; status: string }) {
    this.dataService.confirmAppointment(this.professionalEmail, appointment.date, appointment.time);
    this.loadAppointments();
  }

  cancelAppointment(appointment: { date: string; time: string; status: string }) {
    if (confirm('Voulez-vous vraiment annuler ce rendez-vous ?')) {
      this.dataService.cancelAppointment(this.professionalEmail, appointment.date, appointment.time);
      this.loadAppointments();
    }
  }
}
