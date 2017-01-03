import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';
import { COUNTRIES_DATA } from '../data/countries-data';
import { GENDER } from '../data/gender';

import { validateEmail } from '../email-validator.directive';
import { checkEmailAvailability } from '../email-availability-validator.directive';

@Component({
  selector: 'contacts-creator',
  templateUrl: './contacts-creator.component.html',
  styleUrls: ['./contacts-creator.component.css'],
})
export class ContactsCreatorComponent implements OnInit {

  form: FormGroup;

  countries = COUNTRIES_DATA;
  gender = GENDER;

  constructor(
      private router: Router,
      private contactsService: ContactsService,
      private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', validateEmail, checkEmailAvailability(this.contactsService)],
      phone: '',
      gender: '',
      birthday: '',
      website: '',
      address: this.formBuilder.group({
        street: '',
        zip: '',
        city: '',
        country: ''
      })
    });
  }

  save(value: Contact) {
    this.contactsService.addContact(value)
      .subscribe(() => this.router.navigate(['/']));
  }
}
