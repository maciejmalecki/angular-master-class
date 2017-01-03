import { Directive, forwardRef } from '@angular/core';
import { FormControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { ContactsService } from './contacts.service';

import 'rxjs/add/observable/of';

export function checkEmailAvailability(contactsService: ContactsService, allowedEmail?: string) {
  return (c: FormControl) => {
    if (allowedEmail && allowedEmail === c.value) {
      return of(null);
    }
    return contactsService.isEmailAvailable(c.value).pipe(
      // Async validators emit either `null` when valid
      // or an object which provides additional information
      // about the error. Additionally, we could provide
      // information about which contact uses this email address.
                          map(response => !response.error ? null : {
                            emailTaken: true
                          })
    );
  };
}

@Directive({
  selector: '[trmCheckEmailAvailability][ngModel]',
  providers: [
    // We need to use `useExisting` recipe because we're already
    // creating an instance of `EmailAvailabilityValidator` in the
    // component where this validator is used. We also need to create
    // a `forwardRef` as we're binding to an expression that is not
    // available at particular point yet.
    //
    // For more info read:
    //
    // http://blog.thoughtram.io/angular/2015/09/03/forward-references-in-angular-2.html
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => EmailAvailabilityValidatorDirective),
      multi: true
    }
  ]
})
export class EmailAvailabilityValidatorDirective {

  _validate: Function;

  constructor(contactsService: ContactsService) {
    this._validate = checkEmailAvailability(contactsService);
  }

  validate(c: FormControl) {
    return this._validate(c);
  }
}
