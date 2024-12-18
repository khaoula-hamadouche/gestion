import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Liste des utilisateurs (clients et professionnels)
  private users = [
    { email: 'client@example.com', password: '123', userType: 'client' },
    { email: 'pro@example.com', password: '123', userType: 'professional' },
  ];

  // Disponibilités des professionnels
  private availabilities: { date: string; time: string; professionalEmail: string; available: boolean }[] = [
    { date: '2024-12-06', time: '09:00', professionalEmail: 'pro@example.com', available: true },
    { date: '2024-12-06', time: '10:00', professionalEmail: 'pro@example.com', available: false },
    { date: '2024-12-06', time: '11:00', professionalEmail: 'pro@example.com', available: true },
  ];

  // Rendez-vous
  private appointments: {
    date: string;
    time: string;
    professionalEmail: string;
    clientEmail: string;
    status: 'en attente' | 'confirmé' | 'annulé';
  }[] = [];

  constructor() {}

  // Authentification
  authenticate(email: string, password: string) {
    return this.users.find((user) => user.email === email && user.password === password) || null;
  }

  // Trouver un utilisateur par email et mot de passe
  findUser(email: string, password: string) {
    return this.users.find(user => user.email === email && user.password === password) || null;
  }

  // Ajouter un utilisateur
  addUser(user: { email: string, password: string, userType: string }) {
    this.users.push(user);
  }

  // Récupérer les rendez-vous d'un client
  getClientAppointments(clientEmail: string) {
    return this.appointments.filter(appointment => appointment.clientEmail === clientEmail);
  }

  // Récupérer les rendez-vous d'un professionnel
  getProfessionalAppointments(professionalEmail: string) {
    return this.appointments.filter(appointment => appointment.professionalEmail === professionalEmail);
  }

  // Récupérer les disponibilités d'un professionnel spécifique
  getProfessionalAvailabilities(professionalEmail: string) {
    return this.availabilities.filter(avail => avail.professionalEmail === professionalEmail && avail.available);
  }

  // Récupérer toutes les disponibilités
  getAvailabilities() {
    return this.availabilities;
  }

  // Ajouter une disponibilité pour un professionnel
  addAvailability(newAvailability: { date: string; time: string; professionalEmail: string }) {
    this.availabilities.push({ ...newAvailability, available: true });
  }

  // Mettre à jour les disponibilités en incluant `professionalEmail`
  updateAvailabilities(availabilities: { date: string; time: string; available: boolean; professionalEmail: string }[]) {
    this.availabilities = availabilities;
  }

  // Supprimer une disponibilité
  deleteAvailability(index: number) {
    this.availabilities.splice(index, 1);
  }

  // Ajouter un rendez-vous
  bookAppointment(newAppointment: { date: string; time: string; professionalEmail: string; clientEmail: string }) {
    const availability = this.availabilities.find(
      avail =>
        avail.date === newAppointment.date &&
        avail.time === newAppointment.time &&
        avail.professionalEmail === newAppointment.professionalEmail &&
        avail.available
    );

    if (!availability) {
      console.error('Créneau non disponible ou email professionnel incorrect.');
      return false;
    }

    // Ajouter le rendez-vous
    this.appointments.push({
      date: newAppointment.date,
      time: newAppointment.time,
      professionalEmail: newAppointment.professionalEmail,
      clientEmail: newAppointment.clientEmail,
      status: 'en attente',
    });

    console.log('Rendez-vous ajouté:', this.appointments); // Log pour débogage

    // Rendre le créneau indisponible
    availability.available = false;
    return true;
  }

  // Confirmer un rendez-vous côté professionnel
  confirmAppointment(professionalEmail: string, date: string, time: string) {
    const appointment = this.appointments.find(
      a => a.date === date && a.time === time && a.professionalEmail === professionalEmail
    );
    if (appointment) {
      appointment.status = 'confirmé';
    } else {
      throw new Error('Rendez-vous non trouvé.');
    }
  }

  // Annuler un rendez-vous côté professionnel
  cancelAppointment(professionalEmail: string, date: string, time: string) {
    const appointmentIndex = this.appointments.findIndex(
      a => a.date === date && a.time === time && a.professionalEmail === professionalEmail
    );
    if (appointmentIndex !== -1) {
      this.appointments.splice(appointmentIndex, 1);
    } else {
      throw new Error('Rendez-vous non trouvé.');
    }
  }

  // Annuler un rendez-vous côté client
  cancelClientAppointment(clientEmail: string, date: string, time: string) {
    const appointmentIndex = this.appointments.findIndex(
      (a) =>
        a.date === date &&
        a.time === time &&
        a.clientEmail === clientEmail
    );

    if (appointmentIndex !== -1) {
      const [appointment] = this.appointments.splice(appointmentIndex, 1);

      // Rendre le créneau disponible à nouveau
      const availability = this.availabilities.find(
        (avail) => avail.date === date && avail.time === time
      );
      if (availability) {
        availability.available = true;
      }

      return true; // Rendez-vous annulé
    }

    throw new Error('Rendez-vous non trouvé.');
  }
}
