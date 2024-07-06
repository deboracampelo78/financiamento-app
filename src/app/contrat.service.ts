import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrat } from './contrat';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  readonly url = 'http://localhost:3000/contrato'

  constructor(private http: HttpClient) { }

  get(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(this.url);
  }
  add(c: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(this.url, c);
  }

}

