import { TestBed, ComponentFixture } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ContactsMaterialModule } from '../contacts-material.module';

import { ContactsDetailComponent } from './contacts-detail.component';
import { Contact } from '../models/contact';

let testContact: Contact = {
  id: 0,
  image: '/assets/images/1.jpg',
  name: 'Expected Contact',
  email: 'expected@contact.com',
  address: {
    street: '',
    zip:'',
    city: ''
  }
};


describe('ContactsDetailComponent', () => {

  let fixture: ComponentFixture<ContactsDetailComponent>;
  let component: ContactsDetailComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsDetailComponent],
      imports: [ContactsMaterialModule]
    });

    fixture = TestBed.createComponent(ContactsDetailComponent);
    component = fixture.componentInstance;
  });

  it('should render contact', () => {

    let expectedContact = Object.assign({}, testContact);
    let debugEl = fixture.debugElement.query(By.css('mat-card-title'));

    component.contact = expectedContact;
    fixture.detectChanges();
    expect(debugEl.nativeElement.textContent).toContain(expectedContact.name);

    expectedContact.name = 'Other Name';
    fixture.detectChanges();
    expect(debugEl.nativeElement.textContent).toContain(expectedContact.name);
  });

  it('should emit back event', () => {

    let backEmitted = false;
    let buttonEl = fixture.debugElement.queryAll(By.css('[mat-button]'))[1];

    component.back.subscribe(() => {
      backEmitted = true;
    });

    buttonEl.triggerEventHandler('click', null);
    expect(backEmitted).toBe(true);
  });

  it('should emit edit event', () => {

    let expectedContact = Object.assign({}, testContact);

    let contact: Contact = null;
    let buttonEl = fixture.debugElement.queryAll(By.css('[mat-button]'))[0];

    component.contact = expectedContact;

    component.edit.subscribe((c) => {
      contact = c;
    });

    buttonEl.triggerEventHandler('click', null);
    expect(contact).toBe(expectedContact);
  });
});
