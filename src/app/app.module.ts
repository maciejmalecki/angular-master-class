import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { ContactsMaterialModule } from './contacts-material.module';

import { ContactsAppComponent } from './app.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';

import { ContactsService } from './contacts.service';
import { ContactExistsGuard } from './contact-exists.guard';

import { APP_ROUTES } from './app.routes';
import { API_ENDPOINT } from './app.tokens';

import { ROOT_REDUCER, META_REDUCERS } from './state';
import { ContactsFacade } from './state/contacts/contacts.facade';

@NgModule({
  declarations: [
    ContactsAppComponent,
    ContactsListComponent,
    ContactsDetailComponent,
    ContactsEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContactsMaterialModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot(APP_ROUTES),
    /**
    * By default ngrx will use `combineReducers()` with the reducer map to
    * compose a single root reducer. When providing an array of meta-reducers ngrx
    * will take the reducer map together with the meta-reducers to compose them from
    * right to left to form a root meta-reducer. In other words, we end up having one
    * root reducer which will first call the meta-reducers and finally call `combineReducers`
    * to compute the next state.
    */
    StoreModule.forRoot(ROOT_REDUCER, { metaReducers: META_REDUCERS }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 5 }) : []
  ],
  providers: [
    ContactsFacade,
    ContactsService,
    { provide: API_ENDPOINT, useValue: 'http://localhost:4201/api' },
    ContactExistsGuard
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}
