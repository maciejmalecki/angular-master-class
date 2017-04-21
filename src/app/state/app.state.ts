import { ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { contactsReducer, ContactsState } from './contacts/contacts.reducer';

export interface ApplicationState {
  contacts: ContactsState;
}

export const ROOT_REDUCER: ActionReducerMap<ApplicationState> = {
  contacts: contactsReducer
};

import { environment } from '../../environments/environment';

export const META_REDUCERS = !environment.production ? [storeFreeze] : [];
