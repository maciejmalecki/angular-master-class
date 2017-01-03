import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { COUNTRIES_DATA } from '../data/countries-data';
import { GENDER } from '../data/gender';

import { validateEmail } from '../email-validator.directive';
import { checkEmailAvailability } from '../email-availability-validator.directive';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  contact: Contact;
  form: FormGroup;

  countries = COUNTRIES_DATA;
  gender = GENDER;

  constructor(private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', validateEmail],
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

    this.contactsService
        .getContact(this.route.snapshot.paramMap.get('id'))
        .subscribe(contact => {
          this.contact = contact;
          this.form.get('email').setAsyncValidators(checkEmailAvailability(this.contactsService, this.contact.email));
          this.form.patchValue(contact);
        });
  }

  cancel() {
    this.goToDetails();
  }

  save(contact: Contact) {
    // We're mutating the origin `contact` object with the changes introduced
    // via form interactions. This is because the object reference isn't automatically
    // updated via `FormControl`s.
    Object.assign(this.contact, contact)
    this.contactsService.updateContact(this.contact)
                       .subscribe(() => this.goToDetails());
  }

  private goToDetails() {
    this.router.navigate(['/contact', this.contact.id ]);
  }
}

