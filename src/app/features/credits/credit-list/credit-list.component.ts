import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreditService } from '../../../core/services';
import { CreditDTO, StatutCredit } from '../../../core/models';

@Component({
  selector: 'app-credit-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './credit-list.component.html',
  styleUrl: './credit-list.component.css'
})
export class CreditListComponent implements OnInit {
  credits: CreditDTO[] = [];
  filteredCredits: CreditDTO[] = [];
  selectedStatut: string = '';
  
  statutOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: StatutCredit.EN_ATTENTE, label: 'En attente' },
    { value: StatutCredit.ACCEPTE, label: 'Accepté' },
    { value: StatutCredit.REFUSE, label: 'Refusé' }
  ];

  constructor(private creditService: CreditService) {}

  ngOnInit(): void {
    this.loadCredits();
  }

  loadCredits(): void {
    this.creditService.getAllCredits().subscribe({
      next: (credits) => {
        this.credits = credits;
        this.applyFilter();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des crédits:', err);
        this.credits = [];
        this.filteredCredits = [];
      }
    });
  }

  applyFilter(): void {
    if (!this.selectedStatut) {
      this.filteredCredits = [...this.credits];
    } else {
      this.filteredCredits = this.credits.filter(credit => 
        credit.statut === this.selectedStatut
      );
    }
  }

  onStatutChange(): void {
    this.applyFilter();
  }

  getStatusClass(statut: string): string {
    switch (statut) {
      case StatutCredit.EN_ATTENTE:
        return 'status-en-attente';
      case StatutCredit.ACCEPTE:
        return 'status-accepte';
      case StatutCredit.REFUSE:
        return 'status-refuse';
      default:
        return '';
    }
  }
}
