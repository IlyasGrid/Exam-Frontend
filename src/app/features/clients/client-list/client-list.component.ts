import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../core/services';
import { ClientDTO } from '../../../core/models';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="client-list-container">
      <div class="header-actions">
        <h2>Liste des Clients</h2>
        <div class="actions">
          <div class="search-box">
            <input 
              type="text" 
              [(ngModel)]="searchKeyword" 
              placeholder="Rechercher un client..." 
              (keyup.enter)="searchClients()"
            />
            <button (click)="searchClients()">Rechercher</button>
          </div>
          <button class="add-button" [routerLink]="['/clients/new']">Ajouter un client</button>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @if (clients.length === 0) {
              <tr>
                <td colspan="4" class="no-data">Aucun client trouvé</td>
              </tr>
            } @else {
              @for (client of clients; track client.id) {
                <tr>
                  <td>{{ client.id }}</td>
                  <td>{{ client.nom }}</td>
                  <td>{{ client.email }}</td>
                  <td class="actions-cell">
                    <button class="view-button" [routerLink]="['/clients', client.id]">Voir</button>
                    <button class="edit-button" [routerLink]="['/clients', client.id, 'edit']">Modifier</button>
                    <button class="delete-button" (click)="deleteClient(client.id!)">Supprimer</button>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .client-list-container {
      padding: 1rem;
    }
    
    .header-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    h2 {
      margin: 0;
      color: #333;
    }
    
    .actions {
      display: flex;
      gap: 1rem;
    }
    
    .search-box {
      display: flex;
    }
    
    .search-box input {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
      width: 250px;
    }
    
    .search-box button {
      padding: 0.5rem 1rem;
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
    }
    
    .add-button {
      padding: 0.5rem 1rem;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .table-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    th {
      background-color: #f5f5f5;
      font-weight: 500;
      color: #666;
    }
    
    .actions-cell {
      display: flex;
      gap: 0.5rem;
    }
    
    .view-button, .edit-button, .delete-button {
      padding: 0.4rem 0.8rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
    }
    
    .view-button {
      background-color: #2196f3;
      color: white;
    }
    
    .edit-button {
      background-color: #ff9800;
      color: white;
    }
    
    .delete-button {
      background-color: #f44336;
      color: white;
    }
    
    .no-data {
      text-align: center;
      color: #999;
      padding: 2rem;
    }
  `]
})
export class ClientListComponent implements OnInit {
  clients: ClientDTO[] = [];
  searchKeyword = '';

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  searchClients(): void {
    if (this.searchKeyword.trim()) {
      this.clientService.searchClients(this.searchKeyword).subscribe(clients => {
        this.clients = clients;
      });
    } else {
      this.loadClients();
    }
  }

  deleteClient(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.clients = this.clients.filter(client => client.id !== id);
      });
    }
  }
}
