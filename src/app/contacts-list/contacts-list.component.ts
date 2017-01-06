import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import { EventBusService } from '../event-bus.service';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;

  constructor(private contactsService: ContactsService, private eventBusService: EventBusService) {}

  ngOnInit () {
    this.contacts$ = this.contactsService.getContacts();
    this.eventBusService.emit('appTitleChange', 'Contacts');
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
