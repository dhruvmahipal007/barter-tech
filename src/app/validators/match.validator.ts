import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchValidator(
  controlName: string,
  matchingControlName: string
) {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);
    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ notEquivalent: true });
      return { notEquivalent: true };
    }
    return null;
  };
}
