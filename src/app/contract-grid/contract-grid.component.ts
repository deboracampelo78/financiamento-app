import { Component, OnInit } from '@angular/core';
import { Contrat } from '../contrat';
import { ContratService } from '../contrat.service';

@Component({
  selector: 'app-contract-grid',
  templateUrl: './contract-grid.component.html',
  styleUrls: ['./contract-grid.component.css']
})
export class ContractGridComponent implements OnInit {
  contratos: Contrat[] = [];
  displayedColumns: string[] = ['name', 'ematraso', 'noprazo', 'pago', 'cancelado', 'actions'];
  showOnlyPaid: boolean = false;

  constructor(private contratService: ContratService) {}

  ngOnInit() {
    this.contratService.get().subscribe((co) => this.contratos = co);
  }

  toggleShowOnlyPaid() {
    this.showOnlyPaid = !this.showOnlyPaid;
  }

  get filteredContratos() {
    return this.showOnlyPaid ? this.contratos.filter(c => c.pago === 'Sim') : this.contratos;
  }

  edit(contrat: Contrat) {
  }

  delete(contrat: Contrat) {
    this.contratService.del(contrat).subscribe(() => {
      this.contratos = this.contratos.filter(c => c._id !== contrat._id);
    });
  }

  printContratos() {
    const printContent = document.getElementsByTagName('table')[0].outerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Imprimir Lista de Contratos</title>');
      printWindow.document.write('<style>th, td { text-align: center; }</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(printContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }

}
