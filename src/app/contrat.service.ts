import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Contrat } from './contrat';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  readonly url = 'http://localhost:3000/contrato'

  private contratoSubject$: BehaviorSubject<Contrat[]> = new BehaviorSubject<Contrat[]>([]);
  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Contrat[]> {
    if (!this.loaded) {
      this.http.get<Contrat[]>(this.url)
        .pipe(
          tap((co) => console.log(co)))
        .subscribe(this.contratoSubject$);
      this.loaded = true;
    }
    return this.contratoSubject$.asObservable();
  }

  add(c: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(this.url, c)
      .pipe(
        tap((co: Contrat) => this.contratoSubject$.getValue().push(co))
      )
  }

  del(co:Contrat): Observable<any> {
    return this.http.delete(`${this.url}/${co._id}`)
    .pipe(
      tap(() => {
        let contrats = this.contratoSubject$.getValue();
        let i = contrats.findIndex(c => c._id === co._id);
        if (i >=0) {
          contrats.splice(i, 1);
        }
      })
    )
  }

  update(co: Contrat): Observable<Contrat> {
    return this.http.patch<Contrat>(`${this.url}/${co._id}`, co)
      .pipe(
        tap((updatedCo) => {
          let contrats = this.contratoSubject$.getValue();
          let i = contrats.findIndex(c => c._id === updatedCo._id);
          if (i >= 0) {
            contrats[i].ematraso = updatedCo.ematraso;
            contrats[i].noprazo = updatedCo.noprazo;
            contrats[i].cancelado = updatedCo.cancelado;
            contrats[i].pago = updatedCo.pago;

          }
        })
      );
  }
  

}
