import { ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import { contactsReducer, ContactsState } from './contacts/contacts.reducer';

/**
* By default ngrx will use `combineReducers()` with the reducer map to
* compose a single root reducer. When providing an array of meta-reducers ngrx
* will take the reducer map together with the meta-reducers to compose them from
* right to left to form a root meta-reducer. In other words, we end up having one
* root reducer which will first call the meta-reducers and finally call `combineReducers`
* to compute the next state.
*/

export interface ApplicationState {  contacts: ContactsState;  }

export const ROOT_REDUCER: ActionReducerMap<ApplicationState> = { contacts: contactsReducer };
export const META_REDUCERS = !environment.production ? [storeFreeze] : [];
