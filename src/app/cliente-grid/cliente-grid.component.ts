import { Component, OnInit } from '@angular/core';
import { ClientService } from './../client.service';
import { Client } from '../client';
import { Contrat } from '../contrat';
import { ContratService } from '../contrat.service';

@Component({
  selector: 'app-cliente-grid',
  templateUrl: './cliente-grid.component.html',
  styleUrls: ['./cliente-grid.component.css']
})
export class ClienteGridComponent implements OnInit {
  clientes: Client[] = [];
  contratos: Contrat[] = [];
  displayedColumns: string[] = ['cpf', 'name', 'contrato', 'actions'];

  constructor(
    private clienteService: ClientService,
    private contratoService: ContratService) {}

  ngOnInit() {
    this.clienteService.get().subscribe((ci) => {
      console.log("TESTE",ci);
      this.clientes = ci;
      this.contratoService.get()
      .subscribe((co) => this.contratos = co);
    });  
  }

  edit(cliente: Client) {
    // Logic for editing the contract
  }

  delete(cliente: Client) {
    this.clienteService.del(cliente).subscribe(() => {
      this.clientes = this.clientes.filter(c => c._id !== cliente._id);
    });
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

  printClientes() {
    const printContent = document.getElementsByTagName('table')[0].outerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Imprimir Lista de Clientes</title>');
      printWindow.document.write('<style>th, td { text-align: center; }</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(printContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }
}
