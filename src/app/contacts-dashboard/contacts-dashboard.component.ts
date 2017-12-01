import { Component } from '@angular/core';

@Component({
  selector: 'trm-contacts-dashboard',
  template: `
    <mat-drawer-container>
      <mat-drawer mode="side" opened="true">
        <trm-contacts-list></trm-contacts-list>
      </mat-drawer>
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </mat-drawer-container>
  `,
  styleUrls: ['./contacts-dashboard.component.css']
})
export class ContactsDashboardComponent {}
