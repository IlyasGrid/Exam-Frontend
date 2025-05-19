import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../core/services';
import { ClientDTO } from '../../../core/models';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="client-form-container">
      <h2>{{ isEditMode ? 'Modifier le client' : 'Ajouter un client' }}</h2>
      
      <form [formGroup]="clientForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="nom">Nom</label>
          <input type="text" id="nom" formControlName="nom">
          @if (clientForm.get('nom')?.invalid && clientForm.get('nom')?.touched) {
            <div class="error-message">Le nom est requis</div>
          }
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email">
          @if (clientForm.get('email')?.invalid && clientForm.get('email')?.touched) {
            <div class="error-message">
              @if (clientForm.get('email')?.errors?.['required']) {
                L'email est requis
              } @else if (clientForm.get('email')?.errors?.['email']) {
                Format d'email invalide
              }
            </div>
          }
        </div>
        
        <div class="form-actions">
          <button type="button" class="cancel-button" (click)="cancel()">Annuler</button>
          <button type="submit" class="submit-button" [disabled]="clientForm.invalid">
            {{ isEditMode ? 'Mettre à jour' : 'Ajouter' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .client-form-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #666;
    }
    
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    input:focus {
      outline: none;
      border-color: #3f51b5;
      box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
    }
    
    .error-message {
      color: #f44336;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }
    
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
    
    .cancel-button {
      background-color: #f5f5f5;
      color: #666;
    }
    
    .submit-button {
      background-color: #3f51b5;
      color: white;
    }
    
    .submit-button:disabled {
      background-color: #b0bec5;
      cursor: not-allowed;
    }
  `]
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup;
  isEditMode = false;
  clientId?: number;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Vérifier si nous sommes en mode édition
    this.route.params.subscribe(params => {
      if (params['id'] && params['id'] !== 'new') {
        this.isEditMode = true;
        this.clientId = +params['id'];
        this.loadClient(this.clientId);
      }
    });
  }

  initForm(): void {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  loadClient(id: number): void {
    this.clientService.getClientById(id).subscribe(client => {
      this.clientForm.patchValue({
        nom: client.nom,
        email: client.email
      });
    });
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      return;
    }

    const clientData: ClientDTO = {
      ...this.clientForm.value
    };

    if (this.isEditMode && this.clientId) {
      clientData.id = this.clientId;
      this.clientService.updateClient(clientData).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    } else {
      this.clientService.createClient(clientData).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/clients']);
  }
}
