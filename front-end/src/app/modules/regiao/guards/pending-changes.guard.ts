import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import Swal from 'sweetalert2';
import { RegiaoFormComponent } from '../pages/regiao-form-component/regiao-form-component.component';


@Injectable({ providedIn: 'root' })
export class PendingChangesGuard implements CanDeactivate<RegiaoFormComponent> {
  async canDeactivate(component: RegiaoFormComponent): Promise<boolean> {
    if (component.regiaoForm.dirty) {
      const result = await Swal.fire({
        title: 'Alterações não salvas',
        text: 'Você tem alterações pendentes. Deseja realmente sair?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sair e descartar',
        cancelButtonText: 'Ficar e salvar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#233e99'
      });

      return result.isConfirmed;
    }
    return true;
  }
}