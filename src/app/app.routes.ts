import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ClientListComponent } from './features/clients/client-list/client-list.component';
import { ClientFormComponent } from './features/clients/client-form/client-form.component';
import { ClientDetailComponent } from './features/clients/client-detail/client-detail.component';
import { CreditListComponent } from './features/credits/credit-list/credit-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  // Routes pour les clients
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/new', component: ClientFormComponent },
  { path: 'clients/:id', component: ClientDetailComponent },
  { path: 'clients/:id/edit', component: ClientFormComponent },

  // Routes pour les crédits
  { path: 'credits', component: CreditListComponent },

  // Route par défaut
  { path: '**', redirectTo: '/dashboard' },
];
