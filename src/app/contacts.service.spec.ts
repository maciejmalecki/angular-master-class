import { TestBed, inject, async } from '@angular/core/testing';

import { Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContactsService } from './contacts.service';
import { API_ENDPOINT } from './app.tokens';

const API_URL = 'http://localhost:4201/api';

describe('ContactsService', () => {


  xdescribe('using real backend', () => {

    let contactsService: ContactsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ContactsService,
          { provide: API_ENDPOINT, useValue: API_URL }
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

  describe('using fake backend', () => {

    let contactsService: ContactsService;
    let backend: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ContactsService,
          { provide: API_ENDPOINT, useValue: API_URL }
        ],
        imports: [HttpClientTestingModule]
      });
    });

    beforeEach(inject([ContactsService, HttpTestingController], (service, httpMock) => {
      contactsService = service;
      backend = httpMock;
    }));

    describe('getContacts()', () => {

      it('should fetch and emit contacts array', () => {

        let mockResponse = {
          items: [
            { id: 0, name: 'First contact' },
            { id: 1, name: 'Second contact' },
            { id: 2, name: 'Third contact' }
          ]
        };

        contactsService.getContacts().subscribe(contacts => {
          expect(contacts.length).toEqual(3);
          expect(contacts[0].name).toEqual('First contact');
          expect(contacts[1].name).toEqual('Second contact');
          expect(contacts[2].name).toEqual('Third contact');
        });

        const mockRequest = backend.expectOne(API_URL + '/contacts');

        expect(mockRequest.cancelled).toBeFalsy();
        mockRequest.flush(mockResponse);
        backend.verify();
      });
    });

    describe('getContact()', () => {

      it('should fetch and emit single contact by given id', () => {

        let mockResponse = {
          item: { id: 0, name: 'First contact' }
        };

        contactsService.getContact('0').subscribe(contact => {
          expect(contact).toBeDefined();
          expect(contact.id).toEqual(0);
          expect(contact.name).toEqual('First contact');
        });

        const mockRequest = backend.expectOne(API_URL + '/contacts/0');

        expect(mockRequest.cancelled).toBeFalsy();
        mockRequest.flush(mockResponse);
        backend.verify();
      });
    });

    describe('updateContact()', () => {

      it('should update existing contact', () => {
        let mockResponse = {
          item: { id: 0, name: 'Other name' }
        };

        contactsService.updateContact(mockResponse.item).subscribe();

        const mockRequest = backend.expectOne(API_URL + '/contacts/0');

        expect(mockRequest.request.method).toBe('PUT');
        expect(mockRequest.request.body).toEqual(mockResponse.item);
        expect(mockRequest.cancelled).toBeFalsy();
        mockRequest.flush(mockResponse);
        backend.verify();
      });
    });
  });
});

