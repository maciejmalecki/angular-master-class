import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';
import { COUNTRIES_DATA } from '../data/countries-data';
import { GENDER } from '../data/gender';

@Component({
  selector: 'contacts-creator',
  templateUrl: './contacts-creator.component.html',
  styleUrls: ['./contacts-creator.component.css'],
})
export class ContactsCreatorComponent {

  countries = COUNTRIES_DATA;
  gender = GENDER;

  constructor(private router: Router, private contactsService: ContactsService) {}

  save(value: Contact) {
    this.contactsService.addContact(value)
      .subscribe(() => this.router.navigate(['/']));
  }
}
