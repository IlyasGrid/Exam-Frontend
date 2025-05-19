import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientService, CreditService } from '../../../core/services';
import { ClientDTO, CreditDTO } from '../../../core/models';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="client-detail-container">
      <div class="header-actions">
        <h2>Détails du Client</h2>
        <div class="actions">
          <button class="edit-button" [routerLink]="['/clients', client?.id, 'edit']">Modifier</button>
          <button class="back-button" (click)="goBack()">Retour</button>
        </div>
      </div>
      
      @if (client) {
        <div class="client-info">
          <div class="info-group">
            <span class="label">ID:</span>
            <span class="value">{{ client.id }}</span>
          </div>
          <div class="info-group">
            <span class="label">Nom:</span>
            <span class="value">{{ client.nom }}</span>
          </div>
          <div class="info-group">
            <span class="label">Email:</span>
            <span class="value">{{ client.email }}</span>
          </div>
        </div>
        
        <div class="credits-section">
          <h3>Crédits du client</h3>
          
          @if (credits.length === 0) {
            <p class="no-data">Aucun crédit trouvé pour ce client</p>
          } @else {
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date de demande</th>
                    <th>Statut</th>
                    <th>Montant</th>
                    <th>Durée (mois)</th>
                    <th>Taux</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  @for (credit of credits; track credit.id) {
                    <tr>
                      <td>{{ credit.id }}</td>
                      <td>{{ credit.dateDemande | date:'dd/MM/yyyy' }}</td>
                      <td>
                        <span class="status-badge" [ngClass]="getStatusClass(credit.statut)">
                          {{ credit.statut }}
                        </span>
                      </td>
                      <td>{{ credit.montant | currency:'EUR' }}</td>
                      <td>{{ credit.duree }}</td>
                      <td>{{ credit.taux | percent:'1.2' }}</td>
                      <td class="actions-cell">
                        <button class="view-button" [routerLink]="['/credits', credit.id]">Voir</button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
          
          <div class="add-credit">
            <button class="add-button" [routerLink]="['/credits/new']" [queryParams]="{clientId: client.id}">
              Ajouter un crédit
            </button>
          </div>
        </div>
      } @else {
        <div class="loading">Chargement des données...</div>
      }
    </div>
  `,
  styles: [`
    .client-detail-container {
      padding: 1rem;
    }
    
    .header-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    h2, h3 {
      margin: 0;
      color: #333;
    }
    
    h3 {
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    
    .actions {
      display: flex;
      gap: 1rem;
    }
    
    .edit-button, .back-button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .edit-button {
      background-color: #ff9800;
      color: white;
    }
    
    .back-button {
      background-color: #9e9e9e;
      color: white;
    }
    
    .client-info {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .info-group {
      display: flex;
      margin-bottom: 1rem;
    }
    
    .info-group:last-child {
      margin-bottom: 0;
    }
    
    .label {
      width: 100px;
      font-weight: 500;
      color: #666;
    }
    
    .value {
      flex: 1;
    }
    
    .table-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      margin-bottom: 1.5rem;
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
    
    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    
    .status-en-attente {
      background-color: #ffeb3b;
      color: #333;
    }
    
    .status-accepte {
      background-color: #4caf50;
      color: white;
    }
    
    .status-refuse {
      background-color: #f44336;
      color: white;
    }
    
    .actions-cell {
      white-space: nowrap;
    }
    
    .view-button {
      padding: 0.4rem 0.8rem;
      background-color: #2196f3;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .add-credit {
      margin-top: 1.5rem;
    }
    
    .add-button {
      padding: 0.5rem 1rem;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .no-data {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      color: #999;
    }
    
    .loading {
      text-align: center;
      padding: 2rem;
      color: #666;
    }
  `]
})
export class ClientDetailComponent implements OnInit {
  client?: ClientDTO;
  credits: CreditDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private creditService: CreditService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadClient(id);
      this.loadClientCredits(id);
    });
  }

  loadClient(id: number): void {
    this.clientService.getClientById(id).subscribe(client => {
      this.client = client;
    });
  }

  loadClientCredits(clientId: number): void {
    this.creditService.getCreditsByClientId(clientId).subscribe(credits => {
      this.credits = credits;
    });
  }

  getStatusClass(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE':
        return 'status-en-attente';
      case 'ACCEPTE':
        return 'status-accepte';
      case 'REFUSE':
        return 'status-refuse';
      default:
        return '';
    }
  }

  goBack(): void {
    this.router.navigate(['/clients']);
  }
}
