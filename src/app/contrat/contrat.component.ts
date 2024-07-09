import { Component, OnInit } from '@angular/core';
import { Contrat } from '../contrat';
import { ContratService } from '../contrat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {
  name: string = '';
  ematraso: string = '';
  noprazo: string = '';
  pago: string = '';
  cancelado: string = '';
  showOnlyPaid: boolean = false; // Propriedade para controlar o filtro

  contratos: Contrat[] = [];
  contratEdit: Contrat | undefined;

  constructor(
    private contratService: ContratService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.contratService.get()
      .subscribe((co) => this.contratos = co);
  }

  save() {
    if (this.contratEdit) {
      this.contratService.update({
        _id: this.contratEdit._id,
        name: this.name,
        ematraso: this.ematraso,
        noprazo: this.noprazo,
        pago: this.pago,
        cancelado: this.cancelado
      }).subscribe(
        (co) => {
          this.notify('Updated!');
        },
        (err) => {
          this.notify('Error from Edit');
          console.log(err);
        }
      )
    } else {
      this.contratService.add({
        name: this.name,
        ematraso: this.ematraso,
        noprazo: this.noprazo,
        pago: this.pago,
        cancelado: this.cancelado
      }).subscribe(
        (co) => {
          this.clearFields();
          this.notify('Inserted!');
        },
        (err) => console.error(err))
    }
  }

  clearFields() {
    this.name = '';
    this.ematraso = '';
    this.noprazo = '';
    this.cancelado = '';
    this.pago = '';
  }

  cancel() {
    this.name = '';
    this.ematraso = '';
    this.noprazo = '';
    this.cancelado = '';
    this.pago = '';
  }

  edit(co: Contrat) {
    this.name = co.name;
    this.ematraso = co.ematraso;
    this.noprazo = co.noprazo;
    this.pago = co.pago;
    this.cancelado = co.cancelado;
    this.contratEdit = co;
  }

  delete(co: Contrat) {
    this.contratService.del(co)
      .subscribe(
        () => this.notify('Removed!'),
        (err) => console.log(err)
      )
  }

  toggleShowOnlyPaid() {
    this.showOnlyPaid = !this.showOnlyPaid;
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", { duration: 3000 });
  }
}
