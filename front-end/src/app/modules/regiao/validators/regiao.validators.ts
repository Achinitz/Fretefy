import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

 export function cidadeDuplicadaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control.parent as FormArray;
      if (!formArray) return null;

      const valorAtual = control.value;
      if (!valorAtual || typeof valorAtual !== 'object') return null;

      // Conta quantas vezes esse ID aparece no FormArray
      const duplicados = formArray.controls.filter(ctrl => 
        ctrl.value && ctrl.value.id === valorAtual.id
      ).length;

      return duplicados > 1 ? { cidadeDuplicada: true } : null;
    };
  }

  export function minimoUmItemValidator(control: AbstractControl): ValidationErrors | null {
    const array = control as FormArray;
    return array && array.length > 0 ? null : { precisaCidade: true };
  }