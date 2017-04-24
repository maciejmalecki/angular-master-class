import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';

import { ApplicationState } from '../state';
import { UpdateContactAction } from '../state/contacts/contacts.actions';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private contactsService: ContactsService,
    private store: Store<ApplicationState>,
    private router: Router) { }

  ngOnInit() {
    this.contact$ = this.store.select(state => {
      let id = state.contacts.selectedContactId;
      let contact = state.contacts.list.find(contact => contact.id == id);

      /**
       * We need to clone the contact object to avoid direct state mutations
       * via two-way data bindings using [(ngModel)]
       */
      return Object.assign({}, contact);
    });
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this.contactsService
      .updateContact(contact)
      .subscribe(() => {
        this.store.dispatch(new UpdateContactAction(contact));
        this.goToDetails(contact);
      });
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id ]);
  }
}
