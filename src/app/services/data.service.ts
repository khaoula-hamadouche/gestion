import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Liste des utilisateurs (clients et professionnels)
  private users = [
    { email: 'client@example.com', password: '123', userType: 'client' },
    { email: 'pro@example.com', password: '123', userType: 'professional' },
    { email: 'pro1@example.com', password: '123', userType: 'professional' },

  ];

  // Disponibilités des professionnels
  private availabilities: { date: string; time: string; professionalEmail: string; available: boolean }[] = [
    { date: '2024-12-06', time: '09:00', professionalEmail: 'pro@example.com', available: true },
    { date: '2024-12-06', time: '10:00', professionalEmail: 'pro@example.com', available: false },
    { date: '2024-12-06', time: '11:00', professionalEmail: 'pro@example.com', available: true },
    { date: '2024-12-09', time: '10:00', professionalEmail: 'pro1@example.com', available: true },
    { date: '2024-12-10', time: '13:00', professionalEmail: 'pro1@example.com', available: false },
    { date: '2024-12-11', time: '16:00', professionalEmail: 'pro1@example.com', available: true },
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

  // Récupérer les disponibilités
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

  // Réserver un rendez-vous
  bookAppointment(newAppointment: { date: string; time: string; professionalEmail: string; clientEmail: string }) {
    const availability = this.availabilities.find(
      avail => avail.date === newAppointment.date && avail.time === newAppointment.time && avail.available
    );

    if (!availability) {
      return false; // Créneau non disponible
    }

    // Ajouter le rendez-vous
    this.appointments.push({
      date: newAppointment.date,
      time: newAppointment.time,
      professionalEmail: newAppointment.professionalEmail,
      clientEmail: newAppointment.clientEmail,
      status: 'en attente', // Le statut initial est "en attente"
    });

    // Marquer le créneau comme non disponible
    availability.available = false;
    return true;
  }

  // Confirmer un rendez-vous côté professionnel
  confirmAppointment(date: string, time: string, professionalEmail: string, clientEmail: string) {
    const appointment = this.appointments.find(
      (a) =>
        a.date === date &&
        a.time === time &&
        a.professionalEmail === professionalEmail &&
        a.clientEmail === clientEmail &&
        a.status === 'en attente'
    );

    if (appointment) {
      appointment.status = 'confirmé'; // Le rendez-vous est maintenant confirmé
    } else {
      throw new Error('Rendez-vous non trouvé ou déjà confirmé.');
    }
  }

  // Annuler un rendez-vous côté professionnel
  cancelAppointment(date: string, time: string, professionalEmail: string, clientEmail: string) {
    const appointmentIndex = this.appointments.findIndex(
      (a) =>
        a.date === date &&
        a.time === time &&
        a.professionalEmail === professionalEmail &&
        a.clientEmail === clientEmail
    );

    if (appointmentIndex !== -1) {
      const [appointment] = this.appointments.splice(appointmentIndex, 1); // Supprimer le rendez-vous

      // Rendre le créneau disponible à nouveau
      const availability = this.availabilities.find(
        (avail) => avail.date === date && avail.time === time
      );
      if (availability) {
        availability.available = true;
      }

      return true; // Rendez-vous annulé avec succès
    }

    throw new Error('Rendez-vous non trouvé.');
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
