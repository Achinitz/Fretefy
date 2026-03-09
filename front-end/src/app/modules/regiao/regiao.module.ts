import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegiaoComponent } from './regiao.component';
import { RegiaoRoutingModule } from './regiao.routing';

import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';

import { RegiaoListComponent } from './pages/regiao-list-component/regiao-list-component.component';
import { RegiaoFormComponent } from './pages/regiao-form-component/regiao-form-component.component';
import { InputCidadeComponent } from './components/input-cidade/input-cidade.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PendingChangesGuard } from './guards/pending-changes.guard';


@NgModule({
  imports: [
    CommonModule,
    RegiaoRoutingModule,
    ReactiveFormsModule,
    
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    
    HttpClientModule,
  ],
  declarations: [RegiaoComponent, RegiaoListComponent, RegiaoFormComponent, InputCidadeComponent],
  exports: [RegiaoComponent],
  providers: [
    PendingChangesGuard
  ]
})
export class RegiaoModule { }
