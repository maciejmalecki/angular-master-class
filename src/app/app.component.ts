import { Component } from '@angular/core';


@Component({
  selector: 'trm-contacts-app',
  template: `
    <mat-toolbar color="primary">
      <div fxLayout fxLayoutAlign="space-between center" fxFlex>
        Contacts
        <a mat-button title="Go to about page" routerLink="/about" class="right">About</a>
      </div>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent {}
