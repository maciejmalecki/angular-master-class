import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { of } from 'rxjs/observable/of';
import { map, filter, take } from 'rxjs/operators';

import { ContactsFacade } from './state/contacts/contacts.facade';

@Injectable()
export class ContactExistsGuard implements CanActivate {

  constructor(private contactsFacade: ContactsFacade) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let contactId = route.paramMap.get('id');
    return this.contactsFacade
        .getContactDetails(contactId).pipe(
          filter(contact => !!contact),
          take(1),
          map(contact => !!contact)
        );
  }
}
