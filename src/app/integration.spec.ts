import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ContactsAppComponent } from './app.component';
import { ContactsModule } from './app.module';
import { ContactsService } from './contacts.service';

import { CONTACT_DATA } from './data/contact-data';

describe('ContactAppComponent Integration Specs', () => {

  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<ContactsAppComponent>;
  let contactsService: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContactsModule, RouterTestingModule]
    });
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    contactsService = TestBed.get(ContactsService);
    fixture = TestBed.createComponent(ContactsAppComponent);
  });

  it('should render list of contacts', fakeAsync(() => {

    spyOn(contactsService, 'getContacts').and.returnValue(of(CONTACT_DATA));

    router.navigateByUrl('/');

    tick();
    fixture.detectChanges();

    let viewItems = fixture.debugElement.queryAll(By.css('h3'));

    expect(viewItems.length).toEqual(CONTACT_DATA.length);
    expect(viewItems[0].nativeElement.textContent).toEqual('Christoph Burgdorf');
    expect(viewItems[1].nativeElement.textContent).toEqual('Pascal Precht');
    expect(viewItems[2].nativeElement.textContent).toEqual('Nicole Hansen');
  }));

  it('should navigate to a contact detail view', fakeAsync(() => {

    spyOn(contactsService, 'getContacts').and.returnValue(of(CONTACT_DATA));
    spyOn(contactsService, 'getContact').and.returnValue(of(CONTACT_DATA[0]));
    router.navigateByUrl('/');

    tick();
    fixture.detectChanges();

    let viewItem = fixture.debugElement.queryAll(By.css('a'))[0];
    viewItem.nativeElement.click();

    tick();
    fixture.detectChanges();

    expect(location.path()).toEqual('/contact/0');

    let de = fixture.debugElement.query(By.css('mat-card-title'));
    expect(de.nativeElement.textContent).toContain(CONTACT_DATA[0].name);
  }));
});
