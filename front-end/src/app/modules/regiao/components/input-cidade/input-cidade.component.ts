  import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
  import { FormControl } from '@angular/forms';
  import { Observable, of } from 'rxjs';
  import { map, startWith, switchMap } from 'rxjs/operators';

  @Component({
  selector: 'app-cidade-input',
    templateUrl: './input-cidade.component.html', // Verifique se o nome do arquivo é este mesmo
    styleUrls: ['./input-cidade.component.scss']
  })
  export class InputCidadeComponent implements OnInit {
    @Input() control!: FormControl; // Recebe o controle da lista
    @Input() listaCidades: any[] = [];
    @Output() remover = new EventEmitter<void>();
    @Output() alterouCidade = new EventEmitter<void>();

    ngOnInit() {     

    }

    alterarCidade(){
      this.alterouCidade.emit();
      this.control.updateValueAndValidity();
    }

    exibirCidade(cidade: any): string {
      // Retorna o nome se for um objeto, ou o próprio valor se for string (digitando)
      return cidade && typeof cidade === 'object' ? cidade.nome : (cidade || '');
    }

    estaDuplicada(cidade: any): boolean {
      if (!cidade || !this.listaCidades) return false;
      // Verifica se o ID da cidade da lista já existe no FormArray de cidades
      return this.listaCidades.some((c: any) => c.id === cidade.id);
    }

    private _filtrar(nome: string): any[] {
      const valorFiltrado = nome.toLowerCase();
      return this.listaCidades.filter(c => c.nome.toLowerCase().includes(valorFiltrado));
    }
  }