import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { API_ENDPOINT } from './app.tokens';

import { Contact } from './models/contact';

interface ContactResponse  { item  : Contact    }
interface ContactsResponse { items : Contact[]  }
interface EmailAvailableResponse { msg?: string, error?: boolean }


@Injectable()
export class ContactsService {

  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint) {}


  getContact(id: string): Observable<Contact> {
    return this.http.get<ContactResponse>(`${this.apiEndpoint}/contacts/${id}`)
        .pipe(map(data => data.item));
  }

  getContacts(): Observable<Array<Contact>> {
    return this.http.get<ContactsResponse>(`${this.apiEndpoint}/contacts`)
        .pipe(map(data => data.items));
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<ContactResponse>(`${this.apiEndpoint}/contacts/${contact.id}`, contact)
        .pipe(map(data => data.item));
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<ContactResponse>(`${this.apiEndpoint}/contacts`, contact)
        .pipe(map(data => data.item));
  }

  isEmailAvailable(email: string) {
    return this.http.get<EmailAvailableResponse>(`${this.apiEndpoint}/check-email?email=${email}`);
  }
}
