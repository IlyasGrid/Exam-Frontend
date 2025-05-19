# Rapport : Application de Gestion de Crédits Bancaires

## Introduction

Ce rapport présente l'application de gestion de crédits bancaires développée avec Angular 19. L'application permet de gérer les clients et leurs crédits, avec une interface utilisateur intuitive et responsive.

## Fonctionnalités principales

1. **Gestion des clients**
   - Affichage de la liste des clients
   - Ajout, modification et suppression de clients
   - Consultation des détails d'un client

2. **Gestion des crédits**
   - Affichage de la liste des crédits
   - Filtrage par statut (En attente, Accepté, Refusé)
   - Association des crédits aux clients

3. **Tableau de bord**
   - Statistiques sur les clients et crédits
   - Vue d'ensemble de l'activité

## Architecture technique

- **Frontend** : Angular 19
- **Backend** : API REST Spring Boot
- **Communication** : HTTP Client
- **Styles** : CSS personnalisé

## Structure du projet

```
src/
├── app/
│   ├── core/                 # Services et modèles
│   ├── shared/               # Composants partagés
│   └── features/             # Modules fonctionnels
│       ├── dashboard/        # Tableau de bord
│       ├── clients/          # Gestion des clients
│       └── credits/          # Gestion des crédits
```

## Captures d'écran

### Tableau de bord
![Tableau de bord](screenshots/dashboard.png)

*Le tableau de bord offre une vue d'ensemble des statistiques de l'application.*

### Liste des clients
![Liste des clients](screenshots/client-list.png)

*La liste des clients permet de visualiser, rechercher et gérer les clients.*

### Détails d'un client
![Détails d'un client](screenshots/client-detail.png)

*La page de détails d'un client affiche ses informations et la liste de ses crédits.*

### Liste des crédits
![Liste des crédits](screenshots/credit-list.png)

*La liste des crédits permet de filtrer et gérer tous les crédits de la banque.*

## Points forts

1. **Interface utilisateur intuitive** - Navigation simple et design épuré
2. **Architecture modulaire** - Séparation claire des responsabilités
3. **Code maintenable** - Séparation du HTML, CSS et TypeScript
4. **Gestion des erreurs** - Traitement approprié des cas d'erreur
5. **Responsive design** - Adaptation à différentes tailles d'écran

## Améliorations futures

1. Ajout de l'authentification et des autorisations
2. Implémentation de graphiques interactifs dans le tableau de bord
3. Ajout de fonctionnalités de remboursement
4. Amélioration des filtres et de la recherche
5. Ajout de tests unitaires et d'intégration

## Conclusion

Cette application de gestion de crédits bancaires offre une solution complète pour gérer les clients et leurs crédits. Son architecture modulaire et son interface utilisateur intuitive en font un outil efficace pour les gestionnaires de crédits bancaires.
