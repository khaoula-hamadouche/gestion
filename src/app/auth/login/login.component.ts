import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private dataService: DataService, private router: Router) {}

  onLogin() {
    const user = this.dataService.findUser(this.email, this.password);

    if (user) {
      alert('Connexion réussie !');
      if (user.userType === 'client') {
        this.router.navigate(['/dashboard-client']);
      } else if (user.userType === 'professional') {
        this.router.navigate(['/dashboard-professional']);
      }
    } else {
      alert('Email ou mot de passe incorrect.');
    }
  }

  // Méthode pour naviguer vers la page d'inscription
  navigateToSignup() {
    this.router.navigate(['/auth/signup']);
  }
}
