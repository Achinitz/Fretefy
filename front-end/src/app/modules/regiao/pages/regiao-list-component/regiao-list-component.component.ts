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
    ativo: 1,
    cidades: [
      { id: 1100015, nome: 'Alta Floresta D\'Oeste', uf: 'RO' },
      { id: 1100023, nome: 'Ariquemes', uf: 'RO' }
    ]
  },
  {
    id: '05501',
    nome: 'Região Metropolitana de Curitiba',
    ativo: 1,
    cidades: [
      { id: 4106902, nome: 'Curitiba', uf: 'PR' },
      { id: 4125506, nome: 'São José dos Pinhais', uf: 'PR' }
    ]
  },
  {
    id: 2,
    nome: 'Região Nordeste',
    ativo: 0,
    cidades: [
      { id: 2111300, nome: 'São Luís', uf: 'MA' }
    ]
  },
];

  constructor(private regiaoService: RegiaoService, private router: Router, private excelService: ExcelService) {

  }

  ngOnInit() {
    this.regioes$ = null;

    this.regiaoService.listar().subscribe({
      next: (dados) =>{
        console.log(dados)
      },  
      error: (err) => console.error('Erro ao carregar resumo', err)
    })

  }

  prepararEdicao(regiao: any) {    
    this.regiaoService.setRegiaoParaEditar(regiao);
    
    this.router.navigate(['/regiao/editar', regiao.id]);
  }

  toggleStatus(regiao: any) {
    regiao.ativo = !regiao.ativo;

    this.regiaoService.alterarStatus(regiao.id).subscribe({
      next: (res) =>{

      },
      error: (err) =>{
        
      }
    })

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
