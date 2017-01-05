import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  contact: Contact;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
        .pipe(map(data => data['contact']))
        .subscribe(contact => this.contact = contact);
  }
}
