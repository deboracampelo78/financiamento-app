import { Component, OnInit } from '@angular/core';
import { Contrat } from '../contrat';
import { ContratService } from '../contrat.service';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrl: './contrat.component.css'
})
export class ContratComponent implements OnInit{

  ematraso: string ='';
  noprazo: string = '';
  pago: string = '';
  cancelado: string = '';

  contratos:Contrat[] = [];

  constructor(private contratService:ContratService) { }

  ngOnInit() {
    this.contratService.get()
    .subscribe((co) => this.contratos = co);
  }

  save(){ 
    this.contratService.add(
      {ematraso: this.ematraso, 
        noprazo: this.noprazo, 
        pago: this.pago, 
        cancelado: this.cancelado}).subscribe(
          (co) => {
            console.log(co);
            this.clearFields();

          },
          (err) => console.error(err))
  }
  clearFields(){
    this.ematraso = "";
    this.noprazo = "";
    this.cancelado = "";
    this.pago = "";
  }
  cancel(){

  }
  edit(co:Contrat){

  }

  delete(co:Contrat){

  }

}
