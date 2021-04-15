import { FormGroup } from '@angular/forms';

export function MustMatch(a: string, b: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[a];
    const matchingControl = formGroup.controls[b];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
