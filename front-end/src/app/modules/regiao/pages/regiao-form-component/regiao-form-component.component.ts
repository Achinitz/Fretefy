    import { Component, OnInit } from '@angular/core';
    import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
    import { ActivatedRoute, Router } from '@angular/router';
    import { combineLatest, Observable } from 'rxjs';
    import { RegiaoService } from '../../services/regiao.service';
    import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { cidadeDuplicadaValidator, minimoUmItemValidator } from '../../validators/regiao.validators';

    @Component({
      selector: 'app-regiao-form-component',
      templateUrl: './regiao-form-component.component.html',
      styleUrls: ['./regiao-form-component.component.scss']
    })

    export class RegiaoFormComponent implements OnInit {

      regiaoForm: FormGroup;
      buscaRegiaoCtrl = new FormControl('');
      cidadeSelecionada = new FormControl('');
      opcoesFiltradas$: Observable<any[]>;
      cidadesFiltradas$: Observable<any[]>;
      listaOpcoesGeograficas: any[] = [];
      isEdicao: Boolean = false;
      private ultimoIdBuscado: any = null;
      formLocalidade: FormGroup;

      constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private regiaoService: RegiaoService
      ) {

        this.formLocalidade = this.fb.group({
          cidadeSelecionada: ['']
          // Outros campos como 'tipoRegiao', 'dataReferencia', etc.
        });

        this.regiaoForm = this.fb.group({
          id: [null],
          nome: ['', [Validators.required]],
          cidades: this.fb.array([], [minimoUmItemValidator])
        });
      }

      ngOnInit(): void {

        const idDaRota = this.route.snapshot.params['id'];

        if (idDaRota) {
          this.isEdicao = true;
          this.buscarCidades(this.route.snapshot.params['id']);
          
          // Inscreve no BehaviorSubject para pegar os dados que o ListComponent enviou
          this.regiaoService.regiaoEdicao$.subscribe(dados => {
            if (dados) {

              this.preencherFormulario(dados, idDaRota);
        
            } else {
              // Plano B: Se o usuário deu F5, o BehaviorSubject está nulo.
              // Aqui você buscaria do banco pelo idDaRota se necessário.
            }
          });
        }

        // 1. Criamos o Observable da lista (buscando do seu serviço)
        const lista$ = this.regiaoService.listarOpcoesGeograficas();

        // 2. Criamos o Observable do input
        const nomeCtrl = this.regiaoForm.get('nome');
        const termoBusca$ = nomeCtrl.valueChanges.pipe(
          startWith(nomeCtrl.value || '')
        );

        // 3. COMBINAMOS OS DOIS: Só filtra quando AMBOS tiverem valor
        this.opcoesFiltradas$ = combineLatest([termoBusca$, lista$]).pipe(
          map(([valor, lista]) => {
            // Guarda a lista localmente para outras funções (como o blur)
            this.listaOpcoesGeograficas = lista; 

            const nome = typeof valor === 'string' ? valor : valor?.nome;
            const filtro = (nome || '').toLowerCase();
            
            return filtro 
              ? lista.filter(opt => opt.nome.toLowerCase().includes(filtro)) 
              : lista; // Se vazio, mostra a lista inteira
          })
        );
        
        // Mantém sua lógica de edição
        const id = this.route.snapshot.params['id'];
        if (id) { this.isEdicao = true; }
      }

    estaDuplicada(cidade: any): boolean {
      if (!cidade || !this.cidades) return false;
      // Verifica se o ID da cidade da lista já existe no FormArray de cidades
      return this.cidades.value.some((c: any) => c.id === cidade.id);
    }

    private preencherFormulario(dados: any, idRota: number) {

       // 1. Seta o nome da região (o objeto {id, nome})
      this.regiaoForm.get('nome')?.setValue({ id: dados.id, nome: dados.nome });
      this.regiaoForm.get('id')?.setValue(dados.id);

      // 2. Limpa o array de cidades (caso haja algo)
      this.cidades.clear();

      if (dados.cidades && Array.isArray(dados.cidades)) {
        dados.cidades.forEach(cidade => {
          this.cidades.push(this.fb.control(cidade, [
            Validators.required, 
            cidadeDuplicadaValidator()
          ]));
        });
      }

  // 4. Dispara a busca de cidades para o autocomplete de "Adicionar Cidade"  
}


      asFormControl(control: AbstractControl): FormControl {
        return control as FormControl;
      }

    exibirNome(item: any): string {
      return item && item.nome ? item.nome : '';
    }

      private _filtrar(nome: string): any[] {
        const filtro = nome.toLowerCase();
        return this.listaOpcoesGeograficas.filter(opcao => 
          opcao.nome.toLowerCase().includes(filtro)
        );
      }

      get cidades() {
        return this.regiaoForm.get('cidades') as FormArray;
      }

    onOpcaoSelecionada(event) {
      const selecao = event.option.value;
      this.buscarCidades(selecao.id);
    }

  exibirCidade(cidade: any): string {
    // Se o objeto existir, retorna o nome, senão retorna string vazia
    return cidade && cidade.nome ? cidade.nome : '';
  }

  verificarNomeEscrito() {    
    const valorInput = this.normalizarTexto(this.regiaoForm.get('nome')?.value);
    
    const opcaoValida = this.listaOpcoesGeograficas.find(
      opt => this.normalizarTexto(opt.nome) == valorInput
    );

    if (opcaoValida) {
      this.buscarCidades(opcaoValida.id);      
      this.regiaoForm.get('nome')?.setValue(opcaoValida, { emitEvent: false });
    }
  }

    private buscarCidades(id: any) {

      if (id === this.ultimoIdBuscado) return;
      this.ultimoIdBuscado = id;
      this.cidadeSelecionada.setValue(''); 
      this.cidadesFiltradas$ = this.regiaoService.buscarCidades(id);

    }

    private normalizarTexto(texto: string): string {
      if (!texto) return '';
      if (typeof texto !== 'string') return '';

      return texto
        .toLowerCase()
        .normalize('NFD') // Decompõe os caracteres acentuados (ex: 'ã' vira 'a' + '~')
        .replace(/[\u0300-\u036f]/g, '') // Remove os acentos combinados
        .trim();
    }


      adicionarCidade() {
        
        const cidade = this.formLocalidade.value.cidadeSelecionada;
        const jaExiste = this.cidades.value.some(
          (c: any) => c.nome.toLowerCase() === cidade.nome.toLowerCase()
        );

        if (!cidade) {        
          // Alerta porque veio valor em branco 
        }

        if(jaExiste){
          //Alerta pq essa cidade já foi adicionada
        }

          this.cidades.push(this.fb.control(cidade, [
            Validators.required, 
            cidadeDuplicadaValidator()
          ]));   
          this.cidades.updateValueAndValidity();

          this.regiaoForm.markAsDirty();
          this.formLocalidade.reset();
      }

      validaCidadeAlterada(){
        this.cidades.updateValueAndValidity();
      }

      removerCidade(index: number) {
        this.cidades.removeAt(index);
        this.regiaoForm.markAsDirty();
      }

      salvar(){
          // this.regiaoService.salvar(this.regiaoForm.values).subscribe({
            this.regiaoService.salvar('').subscribe({
            next: (res) =>{

            },
            error: (err) =>{

            }
          })
      }
      
      editar(){
        
      }

      cancelar() {

        this.router.navigate(['/regiao']);

          // Swal.fire({
          //   title: 'Deseja mesmo voltar?',
          //   text: "Você perderá todos os dados inseridos!",
          //   icon: 'warning',
          //   showCancelButton: true,
          //   confirmButtonColor: '#3085d6',
          //   cancelButtonColor: '#d33',
          //   confirmButtonText: 'Sim, voltar',
          //   cancelButtonText: 'Ficar aqui'
          // }).then((result) => {
          //   if (result.isConfirmed) {
          //     this.router.navigate(['/regiao']); // Retorna para a lista
          //   }
          // });
      }

    }
