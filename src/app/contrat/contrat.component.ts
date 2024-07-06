import { Component, OnInit } from '@angular/core';
import { Contrat } from '../contrat';

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

  contratos:Contrat[] = [
    { _id:'0', ematraso:"sim", noprazo:"não", pago:"não", cancelado:"sim"},
    {_id:'1', ematraso:"sim", noprazo:"não", pago:"não", cancelado:"sim"}
  ];

  constructor() { }

  ngOnInit() {

  }

  save(){

  }
  cancel(){

  }
  edit(){
    
  }

}
