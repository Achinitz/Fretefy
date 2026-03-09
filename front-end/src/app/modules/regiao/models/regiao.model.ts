export interface Cidade {
  id: string;
  nome: string;
  uf: string;
}

export interface Regiao {
  id?: number;
  nome: string;
  ativo: boolean;  
  cidades: Cidade[];
}