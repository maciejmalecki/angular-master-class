import { Contact } from '../../models/contact';
import { Action } from '@ngrx/store';

/**
 * We use a string enum here to define action types to allow for string type coercion.
 *
 * The type inferred for a const variable or readonly property without a type
 * annotation is the type of the initializer as-is. This means that the type
 * of a const will match its value. By using an object or define the action
 * type using `let` the type will be string. The type information is helpful
 * to infer the type of the action payload in the reducer. The same effect
 * can be achieved by using string enums introduced in TypeScript 2.4. Make
 * sure to also mark the `type` property as `readonly` on the action class.
 */
export enum ContactsActionTypes {
  LOAD_CONTACT = '[Contacts] Load Contact',
  LOAD_CONTACTS = '[Contacts] Load Contacts',
  LOAD_CONTACTS_SUCCESS = '[Contacts] Load Contacts Success',
  LOAD_CONTACT_DETAILS = '[Contacts] Load Contact Details',
  UPDATE_CONTACT = '[Contacts] Update Contact',
  UPDATE_CONTACT_SUCCESS = '[Contacts] Update Contact Success',
  SELECT_CONTACT = '[Contacts] Select Contact',
  ADD_CONTACT = '[Contacts] Add Contact'
}

export class LoadContactsAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS;
  constructor(public payload = null) { }
}

export class LoadContactsSuccessAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS_SUCCESS;
  constructor(public payload: Array<Contact>) { }
}

export class LoadContactDetailsAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACT_DETAILS;
  constructor(public payload: string) { }
}

export class UpdateContactAction implements Action {
  readonly type = ContactsActionTypes.UPDATE_CONTACT;
  constructor(public payload: Contact) { }
}

export class UpdateContactSuccessAction implements Action {
  readonly type = ContactsActionTypes.UPDATE_CONTACT_SUCCESS;
  constructor(public payload: Contact) { }
}

export class LoadContactAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACT;
  constructor(public payload: string) { }
}

export class SelectContactAction implements Action {
  readonly type = ContactsActionTypes.SELECT_CONTACT;
  constructor(public payload: string) { }
}

export class AddContactAction implements Action {
  readonly type = ContactsActionTypes.ADD_CONTACT;
  constructor(public payload: Contact) { }
}

export type ContactsActions =
  LoadContactsAction | LoadContactsSuccessAction | UpdateContactAction |
  UpdateContactSuccessAction | LoadContactAction | AddContactAction |
  SelectContactAction;
