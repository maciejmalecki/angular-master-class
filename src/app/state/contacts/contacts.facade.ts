import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, take, tap, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ContactsService } from '../../contacts.service';
import { Contact } from 'app/models/contact';

import { ApplicationState } from '../index';
import { ContactsQuery } from './contacts.reducer';

import {
  SelectContactAction,
  AddContactAction,
  LoadContactsSuccessAction,
  UpdateContactSuccessAction
} from './contacts.actions';

@Injectable()
export class ContactsFacade {
  loaded$ = this.store.select(ContactsQuery.getLoaded);
  contacts$ = this.store.select(ContactsQuery.getContacts);
  selectedContact$ = this.store.select(ContactsQuery.getSelectedContact);

  constructor(private store: Store<ApplicationState>,
    private contactsService: ContactsService) { }

  getContact(contactId: string): Observable<Contact> {
    this.selectContact(contactId);

    return this.loaded$.pipe(
      take(1),
      withLatestFrom(this.selectedContact$),
      switchMap(([loaded, selectedContact]) => {
        let addContactToList = (contact: Contact) => {
          if (!selectedContact) {
            this.store.dispatch(new AddContactAction(contact));
          }
        };

        let getContact = (id: string) => this.contactsService
          .getContact(contactId)
          .pipe(tap(addContactToList));

        return loaded ? of(null) : getContact(contactId);
      }),
      switchMap(() => this.selectedContact$)
    );
  }

  getContacts(): Observable<Array<Contact>> {
    return this.loaded$.pipe(
      take(1),
      switchMap(loaded => {
        let addContactsToList = (contacts: Array<Contact>) =>
          this.store.dispatch(new LoadContactsSuccessAction(contacts));

        let getContacts = () => this.contactsService
          .getContacts()
          .pipe(tap(addContactsToList));

        return loaded ? of(null) : getContacts();
      }),
      switchMap(() => this.contacts$)
    );
  }

  updateContact(contact: Contact): Observable<boolean> {
    /**
     * Notice, we no longer inject the router and navigate back to
     * the details view. This is not the responsibility of the facade
     * but the component.
     */
    return this.contactsService.updateContact(contact).pipe(
      map(() => {
        this.store.dispatch(new UpdateContactSuccessAction(contact));

        return true;
      }),
      catchError(() => of(false))
    );
  }

  private selectContact(id: string): void {
    this.store.dispatch(new SelectContactAction(id));
  }
}
