import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ClientDTO } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private path = '/clients';

  constructor(private apiService: ApiService) {}

  getAllClients(): Observable<ClientDTO[]> {
    return this.apiService.get<ClientDTO[]>(this.path);
  }

  getClientById(id: number): Observable<ClientDTO> {
    return this.apiService.get<ClientDTO>(`${this.path}/${id}`);
  }

  searchClients(keyword: string): Observable<ClientDTO[]> {
    // Modifié pour s'adapter à l'API réelle
    return this.apiService.get<ClientDTO[]>(`${this.path}/search/${keyword}`);
  }

  createClient(client: ClientDTO): Observable<ClientDTO> {
    return this.apiService.post<ClientDTO, ClientDTO>(this.path, client);
  }

  updateClient(client: ClientDTO): Observable<ClientDTO> {
    return this.apiService.put<ClientDTO, ClientDTO>(
      `${this.path}/${client.id}`,
      client
    );
  }

  deleteClient(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}/${id}`);
  }
}
