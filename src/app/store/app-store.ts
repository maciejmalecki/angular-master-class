import { InjectionToken } from '@angular/core';
import { createStore, Store, combineReducers } from 'redux';
import { ApplicationState, ROOT_REDUCER } from './root.reducer';

export function appStoreFactory(): Store<ApplicationState> {
  return createStore(combineReducers(ROOT_REDUCER)) as Store<ApplicationState>;
}

export const APP_STORE = new InjectionToken<Store<ApplicationState>>('appStore');

export const APP_STORE_PROVIDER = { provide: APP_STORE, useFactory: appStoreFactory };
