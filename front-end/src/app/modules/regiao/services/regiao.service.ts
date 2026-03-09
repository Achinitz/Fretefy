import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RegiaoService {
  private readonly URL_BASE = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  // --- GERENCIAMENTO DE ESTADO (State Management) ---
  // BehaviorSubject privado para evitar manipulação externa direta
  private regiaoEdicaoSource = new BehaviorSubject<any>(null);
  
  // Observable público para os componentes assinarem
  regiaoEdicao$ = this.regiaoEdicaoSource.asObservable();

  constructor(private http: HttpClient) {}

  /** Envia os dados da lista para o formulário de edição */
  setRegiaoParaEditar(regiao: any): void {
    this.regiaoEdicaoSource.next(regiao);
  }

  /** Limpa o estado para quando for um novo cadastro */
  limparDadosEdicao(): void {
    this.regiaoEdicaoSource.next(null);
  }

  // --- CHAMADAS DE API (Data Services) ---

  listarOpcoesGeograficas(): Observable<{id: any, nome: string}[]> {
    const regioes$ = this.http.get<any[]>(`${this.URL_BASE}/regioes`);
    const metropoles$ = this.http.get<any[]>(`${this.URL_BASE}/regioes-metropolitanas`);

    return forkJoin([regioes$, metropoles$]).pipe(
      map(([regioes, metropoles]) => {
        const regioesFormatadas = regioes.map(r => ({
          id: r.id,
          nome: `Região ${r.nome}`
        }));

        const metropolesFormatadas = metropoles.map(m => ({
          id: m.id,
          nome: m.nome
        }));

        return [...regioesFormatadas, ...metropolesFormatadas];
      })
    );
  }

  buscarCidades(id: number): Observable<any[]> {
    const endpoint = id >= 1 && id <= 5 
      ? `${this.URL_BASE}/regioes/${id}/municipios` 
      : `${this.URL_BASE}/regioes-metropolitanas/${id}`;

    return this.http.get<any>(endpoint).pipe(
      map((res: any) => {
        const uf = Array.isArray(res) && id > 5 ? res[0].UF.sigla : '';
        const lista = Array.isArray(res) && id <= 5 ? res : (res[0]?.municipios || []);

        return lista.map((m: any) => ({
          id: m.id,
          nome: m.nome,
          uf: id <= 5 ? (m.microrregiao?.mesorregiao?.UF?.sigla || '') : uf
        }));
      })
    );
  }
}