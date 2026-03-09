import { Component, OnInit } from '@angular/core';
import { RegiaoService } from '../regiao/services/regiao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  resumo: any = {
    totalRegioes: 0,
    regioesAtivas: 0,
    cidadesAtendidas: 0
  };

  constructor(private regiaoService: RegiaoService) { }

  ngOnInit() {
    this.regiaoService.obterResumoPainel().subscribe({
      next: (dados) =>{
        this.resumo = dados;
      },  
      error: (err) => console.error('Erro ao carregar resumo', err)
    })
  }

}
