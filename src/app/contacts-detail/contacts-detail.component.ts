import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../models/contact';

import { ContactsFacade } from '../state/contacts/contacts.facade';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contact$: Observable<Contact>;

  constructor(private contactsFacade: ContactsFacade) { }

  ngOnInit() {
    this.contact$ = this.contactsFacade.selectedContact$;
  }
}
