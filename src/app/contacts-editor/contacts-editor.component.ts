import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../models/contact';
import { ContactsFacade } from '../state/contacts/contacts.facade';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private router: Router, private contactsFacade: ContactsFacade) { }

  ngOnInit() {
    this.contact$ = this.contactsFacade.selectedContact$;
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this.contactsFacade.updateContact(contact)
      .subscribe(() => this.router.navigate(['/contact', contact.id]));
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id ]);
  }
}
