import { Action } from '@ngrx/store';
import { Contact } from '../../models/contact';

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
  LOAD_CONTACTS_SUCCESS = '[Contacts] Load Contacts Success'
}

export class LoadContactsSuccessAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS_SUCCESS;

  constructor(public payload: Array<Contact>) { }
}

export type ContactsActions = LoadContactsSuccessAction;