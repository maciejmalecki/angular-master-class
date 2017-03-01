import { TestBed, ComponentFixture, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Contact } from '../models/contact';

import { ContactsDetailViewComponent } from './contacts-detail-view.component';
import { ContactsListComponent } from '../contacts-list/contacts-list.component';
import { ContactsEditorComponent } from '../contacts-editor/contacts-editor.component';
import { ContactsService } from '../contacts.service';
import { EventBusService } from '../event-bus.service';
import { API_ENDPOINT } from '../app.tokens';
import { APP_ROUTES } from '../app.routes';

describe('ContactsDetailViewComponent', () => {

  let fixture: ComponentFixture<ContactsDetailViewComponent>;
  let component: ContactsDetailViewComponent;
  let contactsService: ContactsService;

  let expectedContact: Contact = {
    id: '0',
    name: 'Pascal Precht',
    email: 'foo@bar.com'
  };

  let activatedRouteStub = {
    snapshot: {
      params: { id: '0' },
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactsDetailViewComponent,
        ContactsListComponent,
        ContactsEditorComponent
      ],
      providers: [
        ContactsService,
        EventBusService,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        { provide: API_ENDPOINT, useValue: 'http://localhost:4201' }
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(APP_ROUTES)
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ContactsDetailViewComponent);
    component = fixture.componentInstance;

    contactsService = fixture.debugElement.injector.get(ContactsService);
    spyOn(contactsService, 'getContact').and.returnValue(of(expectedContact));
  });

  it('should fetch contact by given route param', () => {
    fixture.detectChanges();
    expect(contactsService.getContact).toHaveBeenCalled();
    expect(contactsService.getContact).toHaveBeenCalledWith('0');
    expect(component.contact).toEqual(expectedContact);
  });

  it('should emit appTitleChange event with contact name', inject([EventBusService], (eventBusService) => {
    spyOn(eventBusService, 'emit');
    fixture.detectChanges();
    expect(eventBusService.emit).toHaveBeenCalledWith('appTitleChange', expectedContact.name);
  }));

  it('should navigate to list', inject([Router], (router) => {
    spyOn(router, 'navigate');
    component.navigateToList();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should navigate to editor route with correct params', inject([Router], (router) => {
    spyOn(router, 'navigate');
    component.navigateToEditor(expectedContact);
    expect(router.navigate).toHaveBeenCalledWith(['/contact', expectedContact.id, 'edit']);
  }));

  it('should navigate to list (test location path)', fakeAsync(inject([Router, Location], (router, location) => {
    spyOn(router, 'navigate').and.callThrough();
    component.navigateToList();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    tick();
    expect(location.path()).toEqual('/');
  })));

  it('should navigate to editor route with correct params (test location path)', fakeAsync(inject([Router, Location], (router, location) => {
    spyOn(router, 'navigate').and.callThrough();
    component.navigateToEditor(expectedContact);
    expect(router.navigate).toHaveBeenCalledWith(['/contact', expectedContact.id, 'edit']);
    tick();
    expect(location.path()).toEqual('/contact/0/edit');
  })));
});
