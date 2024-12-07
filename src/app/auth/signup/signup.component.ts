import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';  // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Importation des modules nécessaires
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  userType = ''; // Définit le rôle de l'utilisateur

  constructor(private dataService: DataService, private router: Router) {}

  onSignup() {
    // Vérifiez si le type d'utilisateur est sélectionné
    if (!this.userType) {
      alert('Veuillez sélectionner votre rôle (Client ou Professionnel).');
      return;
    }

    // Créez l'objet utilisateur à enregistrer
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      userType: this.userType
    };

    // Appelez la méthode pour ajouter un utilisateur via le service
    this.dataService.addUser(user);
    alert('Inscription réussie !');

    // Redirigez l'utilisateur vers la page de connexion après l'inscription
    this.router.navigate(['/auth/login']);
  }
}
