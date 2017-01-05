import { Routes } from '@angular/router';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';
import { ContactsDashboardComponent } from './contacts-dashboard/contacts-dashboard.component';
import { AboutComponent } from './about/about.component';

import { CanDeactivateContactsEditorGuard } from './contacts-editor/can-deactivate-contacts-editor.guard';
import { ContactResolver } from './shared/contact.resolver';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ContactsDashboardComponent,
    children: [
      { path: '', redirectTo: 'contact/0', pathMatch:'full' },
      {
        path: 'contact/:id',
        component: ContactsDetailComponent,
        resolve: {
          contact: ContactResolver
        }
      },
      {
        path: 'contact/:id/edit',
        component: ContactsEditorComponent,
        canDeactivate: [CanDeactivateContactsEditorGuard],
        resolve: {
          contact: ContactResolver
        }
      }
    ]
  },
  { path: 'about', component: AboutComponent },
  // Wildcard route serves as fallback route and has to be
  // the last defined route in this list.
  { path: '**', redirectTo: '/' }
];

