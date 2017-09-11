import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, withLatestFrom, mergeMap, filter } from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { ApplicationState } from '../app.state';
import { ContactsQuery } from './contacts.reducer';
import { ContactsService } from '../../contacts.service';
import { Contact } from '../..//models/contact';

import {
  ContactsActionTypes,
  SelectContactAction,
  AddContactAction,
  LoadContactsAction,
  LoadContactsSuccessAction,
  UpdateContactAction,
  UpdateContactSuccessAction,
  LoadContactDetailsAction,
  LoadContactAction
} from './contacts.actions';

import { NoopAction } from '../app.actions';

@Injectable()
export class ContactsFacade {

  // ************************************************
  // Observable Queries available for consumption by views
  // ************************************************

  loaded$ = this.store.select(ContactsQuery.getLoaded);
  contacts$ = this.store.select(ContactsQuery.getContacts);
  selectedContact$ = this.store.select(ContactsQuery.getSelectedContact);

  // ************************************************
  // Effects to be registered at the Module level
  // ************************************************

  @Effect() getContacts$ = this.actions$
    .ofType(ContactsActionTypes.LOAD_CONTACTS).pipe(
      withLatestFrom(this.loaded$),
      switchMap(([_, loaded]) => {
        return loaded
          ? of(null)
          : this.contactsService.getContacts();
      }),
      map((contacts: Array<Contact> | null) => {
        return contacts
          ? new LoadContactsSuccessAction(contacts)
          : new NoopAction();
      })
    );

  // Action Decider (Splitter)
  // It map's one action to an array of actions
  @Effect() getContactDetails$ = this.actions$
    .ofType(ContactsActionTypes.LOAD_CONTACT_DETAILS).pipe(
      map(toPayload),
      mergeMap(contactId => [
        new SelectContactAction(contactId),
        new LoadContactAction(contactId)
      ])
    );

  // Action Decider (Content-Based Decider)
  // A content-based decider uses the payload of an action to map it to a different action
  @Effect() getContact$ = this.actions$
    .ofType(ContactsActionTypes.LOAD_CONTACT).pipe(
      map(toPayload),
      withLatestFrom(this.loaded$, this.selectedContact$),
      switchMap(([contactId, loaded, selectedContact]) => {
        const contactLoaded = selectedContact && selectedContact.id === +contactId;

        return loaded || contactLoaded
          ? of(null)
          : this.contactsService.getContact(contactId);
      }),
      map((contact: Contact | null) => {
        return contact
          ? new AddContactAction(contact)
          : new NoopAction();
      })
    );

  @Effect() updateContact$ = this.actions$
    .ofType(ContactsActionTypes.UPDATE_CONTACT).pipe(
      map(toPayload),
      switchMap((contact: Contact) => this.contactsService.updateContact(contact)),
      map((contact: Contact) => {
        this.router.navigate(['/contact', contact.id]);
        return new UpdateContactSuccessAction(contact)
      })
    );

  // ************************************************
  // Public Code (Action Creators)
  // ************************************************

  constructor(
    private actions$: Actions,
    private store: Store<ApplicationState>,
    private router: Router,
    private contactsService: ContactsService
  ) { }

  getContactDetails(contactId: string): Observable<Contact> {
    this.store.dispatch(new LoadContactDetailsAction(contactId));
    return this.selectedContact$;
  }

  getContacts(): Observable<Array<Contact>> {
    this.store.dispatch(new LoadContactsAction());
    return this.contacts$;
  }

  updateContact(contact: Contact): void {
    this.store.dispatch(new UpdateContactAction(contact));
  }
}
