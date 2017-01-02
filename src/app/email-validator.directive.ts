import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

export function validateEmail(c: FormControl) {
  return (EMAIL_REGEXP.test(c.value) || c.value === '') ? null : {
    validateEmail: {
      valid: false
    }
  };
}

@Directive({
  selector: '[trmValidateEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useValue: validateEmail, multi: true }
  ]
})
export class EmailValidatorDirective {}
