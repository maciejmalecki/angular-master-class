import { TestBed, inject, async } from '@angular/core/testing';

import { Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ContactsService } from './contacts.service';
import { API_ENDPOINT } from './app.tokens';

describe('ContactsService', () => {

  let contactsService: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactsService,
        { provide: API_ENDPOINT, useValue: 'http://localhost:4201/api' }
      ],
      imports: [HttpClientModule]
    });
  });

  beforeEach(inject([ContactsService], (service) => {
    contactsService = service;
  }));

  describe('getContacts()', () => {

    it('should fetch and emit contacts list', async(() => {
      contactsService.getContacts().subscribe(contacts => {
        expect(contacts.length).toEqual(11);
        expect(contacts[0].name).toEqual('Christoph Burgdorf');
        expect(contacts[1].name).toEqual('Pascal Precht');
        expect(contacts[2].name).toEqual('Nicole Hansen');
      });
    }));
  });

  describe('getContact()', () => {

    it('should fetch and emit single contact by given id', async(() => {
      contactsService.getContact('0').subscribe(contact => {
        expect(contact).toBeDefined();
        expect(contact.id).toEqual(0);
        expect(contact.name).toEqual('Christoph Burgdorf');
      });
    }));
  });
});

