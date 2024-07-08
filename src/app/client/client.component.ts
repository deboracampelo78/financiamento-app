import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../client';
import { ContratService } from '../contrat.service';
import { Contrat } from '../contrat';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
[x: string]: any;

  clientForm: FormGroup = this.formBuilder.group({
    _id: [null],
    cpf: ['', [Validators.required]],
    name: ['', [Validators.required]],
    contratos: [[], [Validators.required]],
  });

  clientes: Client[] = [];
  contratos: Contrat[] = [];
  depCliente: Client | null = null;
  ciContrat: string[] = [];

  constructor(
    private clienteService: ClientService,
    private formBuilder: FormBuilder,
    private contratoService: ContratService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.clienteService.get()
      .subscribe((cli) => this.clientes = cli);
    this.contratoService.get()
      .subscribe((co) => this.contratos = co);
  }

  getContratos(cliente: any): string[] {
    const contratoIds: string[] = cliente.contratos || [];
    const nomesContratos: string[] = [];
  
    contratoIds.forEach(id => {
      const contrato = this.contratos.find(c => c._id === id);
      if (contrato) {
        nomesContratos.push(contrato.name);
      }
    });
  
    return nomesContratos;
  }
  

  save() {
    const data = this.clientForm.value;
    if (data._id != null) {
      this.clienteService.update(data).subscribe((updatedClient) => {
        const index = this.clientes.findIndex(c => c._id === updatedClient._id);
        if (index > -1) {
          this.clientes[index] = updatedClient;
        }
        this.notify('Client updated!');
        this.clearFields();
      });
    } else {
      this.clienteService.add(data).subscribe((newClient) => {
        this.clientes.push(newClient);
        this.notify('Client added!');
        this.clearFields();
      });
    }
  }

  clearFields() {
    this.clientForm.reset({
      _id: null,
      cpf: '',
      name: '',
      contratos: []
    });
    this.depCliente = null;
  }
  
  delete(ci: Client) {
    this.clienteService.del(ci)
      .subscribe(() => {
        this.clientes = this.clientes.filter(c => c._id !== ci._id);
        this.notify('Removed!');
      }, (err) => console.log(err));
  }

  edit(ci: Client) {
    const contratos = Array.isArray(ci.contrato)
      ? typeof ci.contrato[0] === 'string'
        ? this.contratos.filter(c => (ci.contrato as string[]).includes(c._id!))
        : ci.contrato as Contrat[]
      : [];

    this.clientForm.setValue({
      _id: ci._id || null,
      cpf: ci.cpf || '',
      name: ci.name || '',
      contratos: contratos
    });
    this.depCliente = ci;
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", { duration: 3000 });
  }

  cancel() {
    this.clientForm.reset({
      _id: null,
      cpf: '',
      name: '',
      contratos: []
    });
    this.depCliente = null;
  }
  
}
