import { createSelector } from '@ngrx/store';

import { Contact } from '../../models/contact';
import { ContactsActionTypes, ContactsActions } from '../contacts/contacts.actions';
import { ApplicationState } from "../index";

export interface ContactsState {
  list: Array<Contact>;
  selectedContactId: string | null;
  loaded: boolean;
}

const INITAL_STATE: ContactsState = {
  list: [],
  selectedContactId: null,
  loaded: false
};

export function contactsReducer(state: ContactsState = INITAL_STATE, action: ContactsActions) {
  switch (action.type) {
    case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
      return {
        ...state,
        loaded: true,
        list: action.payload
      };
    case ContactsActionTypes.SELECT_CONTACT:
      return {
        ...state,
        selectedContactId: action.payload
      }
    case ContactsActionTypes.ADD_CONTACT:
      let findInList = (contact) => contact.id == action.payload.id;

      let inStore = state.list.some(findInList);

      return {
        ...state,
        list: !inStore ? [...state.list, action.payload] : [...state.list]
      }
    case ContactsActionTypes.UPDATE_CONTACT_SUCCESS:
      let updatedList = state.list.map(contact => contact.id == action.payload.id
        ? { ...contact, ...action.payload } : contact);

      return {
        ...state,
        list: updatedList
      }
    default:
      return state;
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level.
 *
 * Remember to keep your selectors small and focused so they can be combined
 * and composed to fit each particular use-case.
 *
 * Why Query(s)?
 * If store is analogous to a database and reducers the tables, then selectors can
 * be considered the queries into said database.
 */

export namespace ContactsQuery {
  export const getContacts = (state: ApplicationState) => state.contacts.list;
  export const getLoaded = (state: ApplicationState) => state.contacts.loaded;
  export const getSelectedContactId = (state: ApplicationState) => state.contacts.selectedContactId;

  /**
   * When using `createSelector` the store keeps track of the latest arguments in which
   * the selector function was invoked. This means that if the arguments match, the last
   * result can simply be returned without reinvoking the selector. This can provide
   * performance benefits especially with selectors that perform expensive computations.
   * This practice is also called memoization.
   */
  export const getSelectedContact = createSelector(getContacts, getSelectedContactId, (contacts, id) => {
    let contact = contacts.find(contact => contact.id == id);

    return contact ? Object.assign({}, contact) : undefined;
  });
}
