import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../client';
import { ContratService } from '../contrat.service';
import { Contrat } from '../contrat';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  clientForm: FormGroup = this.formBuilder.group({
    _id: [null],
    cpf: ['', [Validators.required]],
    name: ['', [Validators.required]],
    contratos: [[], [Validators.required]],
  })

  clientes: Client[] = [];
  contratos: Contrat[] = [];
  depCliente: Client | null = null;

  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private clienteService: ClientService,
    private formBuilder: FormBuilder,
    private contratoService: ContratService,
    private snackBar: MatSnackBar) { }

    ngOnInit() {
      this.clienteService.get()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((cli) => {
          this.clientes = cli;
        });
      this.contratoService.get()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((co) => {
          this.contratos = co;
        });
    }
    

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  getContratos(ci: Client): Contrat[] {
    return Array.isArray(ci.contrato) ? ci.contrato as Contrat[] : [];
  }

  save() {
    let data = this.clientForm.value;
    if (data._id != null) {
      this.clienteService.update(data).subscribe();
    }
    else {
      this.clienteService.add(data).subscribe();
    }
  }

  delete(ci:Client) {
    this.clienteService.del(ci)
    .subscribe(
      () => this.notify('Removed!'),
      (err) => console.log(err)
    )
  }

  edit(ci:Client) {
    this.clientForm.setValue(ci);
    this.depCliente = ci;
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", { duration: 3000 });
  }


}
