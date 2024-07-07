import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './client';
import { Contrat } from './contrat';  // Importe o tipo Contrat se necessário
import { BehaviorSubject, combineLatest, Observable, tap, map } from 'rxjs';
import { ContratService } from './contrat.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  readonly url = 'http://localhost:3000/cliente';
  private clienteSubject$: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  private loaded: boolean = false;

  constructor(
    private http: HttpClient,
    private contratoService: ContratService) {
     
     }

     get(): Observable<Client[]> {
      if (!this.loaded) {
        combineLatest(
          this.http.get<Client[]>(this.url),
          this.contratoService.get()
        )
        .pipe(
          tap(([clients, cotrats]) => console.log(clients, cotrats)),
          map(([clients, contrats]: [Client[], Contrat[]]) => {
            for (const client of clients) {
              let ids = Array.isArray(client.contrato) ? client.contrato as string[] : [];
              client.contrato = ids
                .map((id) => contrats.find((cont: Contrat | undefined) => cont && cont._id === id))
                .filter((cont: Contrat | undefined) => !!cont) as Contrat[];
            }
            return clients;
          }),
          tap((clients) => console.log(clients))
        )
        .subscribe(this.clienteSubject$); 
    
        this.http.get<Client[]>(this.url)
          .pipe(
            tap((ci) => console.log(ci))
          )
          .subscribe(this.clienteSubject$);
        this.loaded = true;
      }
      return this.clienteSubject$.asObservable();
    }    
    
    add(c: Client): Observable<Client> {
      return this.http.post<Client>(this.url, { ...c })
        .pipe(
          tap((ci) => {
            let currentClients = this.clienteSubject$.getValue();
            currentClients.push({ ...c, _id: ci._id });
            this.clienteSubject$.next(currentClients);
          })
        );
    }
    
    
  del(c: Client): Observable<any> {
    return this.http.delete(`${this.url}/${c._id}`)
    .pipe(
      tap(() => {
        let clients = this.clienteSubject$.getValue();
        let i = clients.findIndex(ci => ci._id === c._id);
        if (i >=0) {
          clients.splice(i, 1);
          this.clienteSubject$.next(clients);
        }
      })
    )
  }


  update(c: Client): Observable<Client> {
    let contratos = Array.isArray(c.contrato) ? c.contrato.map(co => (co as Contrat)._id) : [];
    return this.http.patch<Client>(`${this.url}/${c._id}`, { ...c, contratos })
      .pipe(
        tap(() => {
          let clients = this.clienteSubject$.getValue();
          let i = clients.findIndex(ci => ci._id === c._id);
          if (i >= 0) {
            clients[i] = c;
            this.clienteSubject$.next(clients);
          }
        })
      );
  }
  
  
}
