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

  ematraso: string = '';
  noprazo: string = '';
  pago: string = '';
  cancelado: string = '';

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
    this.ematraso = '';
    this.noprazo = '';
    this.cancelado = '';
    this.pago = '';
  }

  cancel() {

  }

  edit(co: Contrat) {
    this.ematraso = co.ematraso;
    this.noprazo = co.noprazo;
    this.pago = co.pago;
    this.cancelado = co.cancelado;
    this.contratEdit = co;
  }

  delete(co: Contrat) {
    this.contratService.del(co)
      .subscribe(
        (co) => this.notify('Removed!'),
        (err) => console.log(err)
      )

  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", { duration: 3000 });
  }

}
