import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, merge, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;
  private terms$ = new Subject<string>();

  constructor(private contactsService: ContactsService) {}

  ngOnInit () {
    this.contacts$ = this.terms$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.contactsService.search(term)),
      merge(this.contactsService.getContacts()),
    );
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
