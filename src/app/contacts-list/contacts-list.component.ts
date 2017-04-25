import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../models/contact';

import { ContactsFacade } from '../state/contacts/contacts.facade';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;

  constructor(private contactsFacade: ContactsFacade) { }

  ngOnInit() {
    this.contacts$ = this.contactsFacade.getContacts();
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
