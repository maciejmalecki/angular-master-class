import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../models/contact';

import { ApplicationState } from '../state';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contact$: Observable<Contact>;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.contact$ = this.store.select(state => {
      let id = state.contacts.selectedContactId;

      return state.contacts.list.find(contact => contact.id == id);
    });
  }
}
