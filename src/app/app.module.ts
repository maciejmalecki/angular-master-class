import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsMaterialModule } from './contacts-material.module';

import { ContactsAppComponent } from './contacts.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
import { ContactsDetailViewComponent } from './contacts-detail-view/contacts-detail-view.component';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';
import { TabsComponent, TabComponent } from './tabs';
import { ContactsDashboardComponent } from './contacts-dashboard/contacts-dashboard.component';
import { CanDeactivateContactsEditorGuard } from './contacts-editor/can-deactivate-contacts-editor.guard';
import { ConfirmDeactivationDialogComponent } from './contacts-editor/confirm-deactivation-dialog.component';
import { ContactsCreatorComponent } from './contacts-creator/contacts-creator.component';

import { EmailValidatorDirective } from './email-validator.directive';
import { EmailAvailabilityValidatorDirective } from './email-availability-validator.directive';

import { ContactsService } from './contacts.service';
import { EventBusService } from './event-bus.service';
import { ContactResolver } from './shared/contact.resolver';

import { APP_ROUTES } from './app.routes';
import { API_ENDPOINT } from './app.tokens';

export function confirmNavigationGuard(component) {
  return !component.warnOnClosing || window.confirm('Navigate away without saving?');
}

@NgModule({
  declarations: [
    ContactsAppComponent,
    ContactsListComponent,
    ContactsDetailViewComponent,
    ContactsDetailComponent,
    ContactsEditorComponent,
    ContactsCreatorComponent,
    ContactsDashboardComponent,
    TabsComponent,
    TabComponent,
    ConfirmDeactivationDialogComponent,
    EmailValidatorDirective,
    EmailAvailabilityValidatorDirective
  ],
  entryComponents: [ConfirmDeactivationDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTES),
    FlexLayoutModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ContactsMaterialModule
  ],
  providers: [
    ContactsService,
    EventBusService,
    { provide: API_ENDPOINT, useValue: 'http://localhost:4201/api' },
    { provide: 'ConfirmNavigationGuard', useValue: confirmNavigationGuard },
    CanDeactivateContactsEditorGuard,
    ContactResolver
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}
