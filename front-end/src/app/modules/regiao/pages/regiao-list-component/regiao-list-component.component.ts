import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Regiao } from '../../models/regiao.model';
import { RegiaoService } from '../../services/regiao.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-regiao-list-component',
  templateUrl: './regiao-list-component.component.html',
  styleUrls: ['./regiao-list-component.component.scss']
})
export class RegiaoListComponent implements OnInit {

regioes$: Observable<Regiao[]>;

 REGIOES_MOCK = [
  {
    id: 1,
    nome: 'Região Norte',
    ativo: true,
    cidades: [
      { id: 1100015, nome: 'Alta Floresta D\'Oeste', uf: 'RO' },
      { id: 1100023, nome: 'Ariquemes', uf: 'RO' }
    ]
  },
  {
    id: '05501',
    nome: 'Região Metropolitana de Curitiba',
    ativo: true,
    cidades: [
      { id: 4106902, nome: 'Curitiba', uf: 'PR' },
      { id: 4125506, nome: 'São José dos Pinhais', uf: 'PR' }
    ]
  },
  {
    id: 2,
    nome: 'Região Nordeste',
    ativo: false,
    cidades: [
      { id: 2111300, nome: 'São Luís', uf: 'MA' }
    ]
  },
];

  constructor(private regiaoService: RegiaoService, private router: Router, private excelService: ExcelService) {}

  ngOnInit() {
    this.regioes$ = null;
  }

  prepararEdicao(regiao: any) {    
    this.regiaoService.setRegiaoParaEditar(regiao);
    
    this.router.navigate(['/regiao/editar', regiao.id]);
  }

  toggleStatus(regiao: any) {
    regiao.ativo = !regiao.ativo;
}

exportarDados(): void { 
    const dadosParaExportar = this.REGIOES_MOCK.map(regiao => ({
      'Nome da Região': regiao.nome,
      'Status': regiao.ativo ? 'Ativa' : 'Inativa',
      'Qtd Cidades': regiao.cidades?.length || 0
    }));

    this.excelService.exportToExcel(dadosParaExportar, 'Relatorio_Regioes', 'Regiões');
  }

}
