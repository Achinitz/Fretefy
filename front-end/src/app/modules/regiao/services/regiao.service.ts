import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RegiaoService {


  private readonly URL_IBGE = environment.apiIbgeUrl;
  private readonly API = environment.apiUrl;

  private regiaoEdicaoSource = new BehaviorSubject<any>(null);
  regiaoEdicao$ = this.regiaoEdicaoSource.asObservable();

  constructor(private http: HttpClient) {}

  setRegiaoParaEditar(regiao: any): void {
    this.regiaoEdicaoSource.next(regiao);
  }

  limparDadosEdicao(): void {
    this.regiaoEdicaoSource.next(null);
  }

  listarOpcoesGeograficas(): Observable<{id: any, nome: string}[]> {    
    const regioes$ = this.http.get<any[]>(`${this.URL_IBGE}/regioes`);
    const metropoles$ = this.http.get<any[]>(`${this.URL_IBGE}/regioes-metropolitanas`);

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
      ? `${this.URL_IBGE}/regioes/${id}/municipios` 
      : `${this.URL_IBGE}/regioes-metropolitanas/${id}`;

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

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  salvar(regiao: any): Observable<any> {
    return this.http.post(this.API, regiao);
  }

  editar(regiao: any): Observable<any> {
    return this.http.put(this.API, regiao);
  }

  alterarStatus(id: string): Observable<any> {    
    return this.http.patch(`${this.API}/${id}/status`, {});
  }

  obterResumoPainel(): Observable<any> {
    return this.http.get<any>(`${this.API}/resumo`);
  }   
}