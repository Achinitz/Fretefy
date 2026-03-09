import { RouterModule, Routes } from '@angular/router';
import { RegiaoComponent } from './regiao.component';
import { RegiaoListComponent } from './pages/regiao-list-component/regiao-list-component.component';
import { RegiaoFormComponent } from './pages/regiao-form-component/regiao-form-component.component';
import { PendingChangesGuard } from './guards/pending-changes.guard';


const routes: Routes = [
{ path: '', component: RegiaoListComponent, data: { title: 'Listagem de Regiões' } },
  { path: 'novo', component: RegiaoFormComponent, data: { title: 'Cadastrar Nova Região' }, canDeactivate: [PendingChangesGuard] },
  { path: 'editar/:id', component: RegiaoFormComponent, data: { title: 'Editar Região' }, canDeactivate: [PendingChangesGuard] }
];

export const  RegiaoRoutingModule = RouterModule.forChild(routes);