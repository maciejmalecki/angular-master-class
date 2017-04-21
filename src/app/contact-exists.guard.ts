import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { of } from 'rxjs/observable/of';
import { tap, map, take, switchMap } from 'rxjs/operators';

import { ContactsService } from "./contacts.service";
import { Contact } from 'app/models/contact';

import { ApplicationState } from "./state";
import { ContactsQuery } from './state/contacts/contacts.reducer';

import {
  SelectContactAction,
  AddContactAction
} from './state/contacts/contacts.actions';

@Injectable()
export class ContactExistsGuard implements CanActivate {

  constructor(public store: Store<ApplicationState>, private contactsService: ContactsService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let contactId = route.paramMap.get('id');
    this.store.dispatch(new SelectContactAction(contactId));

    return this.store.select(ContactsQuery.getLoaded).pipe(
      take(1),
      switchMap(loaded => {
        let addContactToList = (contact: Contact) => this.store.dispatch(new AddContactAction(contact));

        return loaded ?
          of(true) :
          this.contactsService.getContact(contactId).pipe(
            tap(addContactToList),
            map(contact => !!contact)
          );
      })
    );
  }
}
