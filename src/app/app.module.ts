import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ContactsMaterialModule } from './contacts-material.module';

import { ContactsAppComponent } from './app.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';
import { ContactsDashboardComponent } from './contacts-dashboard/contacts-dashboard.component';
import { CanDeactivateContactsEditorGuard } from './contacts-editor/can-deactivate-contacts-editor.guard';
import { ConfirmDeactivationDialogComponent } from './contacts-editor/confirm-deactivation-dialog.component';

import { ContactsService } from './contacts.service';
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
    ContactsDetailComponent,
    ContactsEditorComponent,
    ContactsDashboardComponent,
    ConfirmDeactivationDialogComponent
  ],
  entryComponents: [ConfirmDeactivationDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContactsMaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ContactsService,
    { provide: API_ENDPOINT, useValue: 'http://localhost:4201/api' },
    { provide: 'ConfirmNavigationGuard', useValue: confirmNavigationGuard },
    CanDeactivateContactsEditorGuard,
    ContactResolver
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}
