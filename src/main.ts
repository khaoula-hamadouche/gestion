import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';  // Assurez-vous d'importer 'appRoutes' et non 'routes'

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes)],  // Utilisez 'appRoutes' ici
}).catch((err) => console.error(err));
