import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

import { ContactsService } from '../../contacts.service';
import { Contact } from '../../models/contact';

import {
  ContactsActionTypes,
  LoadContactsSuccessAction,
  UpdateContactSuccessAction
} from './contacts.actions';

@Injectable()
export class ContactsEffects {
  constructor(
    private actions$: Actions,
    private contactsService: ContactsService,
    private router: Router) {
  }

  @Effect() getContacts$ = this.actions$
    .ofType(ContactsActionTypes.LOAD_CONTACTS).pipe(
      switchMap(payload => this.contactsService.getContacts()),
      map((contacts: Array<Contact>) => new LoadContactsSuccessAction(contacts))
    );

  @Effect() updateContact$ = this.actions$
    .ofType(ContactsActionTypes.UPDATE_CONTACT).pipe(
      map(toPayload),
      switchMap((contact: Contact) => this.contactsService.updateContact(contact)),
      tap((contact: Contact) => this.router.navigate(['/contact', contact.id])),
      map((contact: Contact) => new UpdateContactSuccessAction(contact))
    );
}
