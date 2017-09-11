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
export class ContactsEditorComponent {
  contact$: Observable<Contact> = this.contactsFacade.selectedContact$;

  constructor(private router: Router, private contactsFacade: ContactsFacade) { }

  cancel(contact: Contact) {
    this.router.navigate(['/contact', contact.id ]);
  }

  save(contact: Contact) {
    this.contactsFacade.updateContact(contact);
  }

}
