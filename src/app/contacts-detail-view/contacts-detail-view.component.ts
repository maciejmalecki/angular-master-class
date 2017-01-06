import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'trm-contacts-detail-view',
  template: `
    <trm-contacts-detail [contact]="contact"
                    (edit)="navigateToEditor($event)"
                    (back)="navigateToList()">
    </trm-contacts-detail>
  `,
  styleUrls: ['./contacts-detail-view.component.css']
})
export class ContactsDetailViewComponent implements OnInit {

  contact: Contact;

  constructor(private contactsService: ContactsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.contactsService.getContact(this.route.snapshot.params['id'])
                        .subscribe(contact => this.contact = contact);
  }

  navigateToList () {
    this.router.navigate(['/']);
  }

  navigateToEditor (contact) {
    this.router.navigate(['/contact', contact.id, 'edit']);
  }
}
