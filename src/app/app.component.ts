import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import { switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Component({
  selector: 'trm-contacts-app',
  template: `
    <mat-toolbar color="primary">Contacts</mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent {

  constructor(updates: SwUpdate, snackbar: MatSnackBar) {
    updates.available.pipe(
      switchMap(_ => snackbar.open('New version available', 'Reload').onAction()),
      switchMap(_ => fromPromise(updates.activateUpdate()))
    ).subscribe(_ => document.location.reload());
  }
}
