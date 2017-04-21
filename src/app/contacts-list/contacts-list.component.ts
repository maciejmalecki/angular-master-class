import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';

import { ApplicationState } from '../state';
import { LoadContactsSuccessAction } from '../state/contacts/contacts.actions';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;

  constructor(private store: Store<ApplicationState>, private contactsService: ContactsService) { }

  ngOnInit() {
    this.contacts$ = this.store.select(state => state.contacts.list);

    this.contactsService.getContacts()
      .subscribe(contacts => this.store.dispatch(new LoadContactsSuccessAction(contacts)));
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
