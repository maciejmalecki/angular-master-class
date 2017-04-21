import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Contact } from '../models/contact';

import { ApplicationState } from '../state';
import { LoadContactsAction } from '../state/contacts/contacts.actions';
import { ContactsQuery } from '../state/contacts/contacts.reducer';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.contacts$ = this.store.select(ContactsQuery.getContacts);
    this.store.dispatch(new LoadContactsAction());
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
