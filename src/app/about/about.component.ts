import { Component } from '@angular/core';

@Component({
  selector: 'trm-about',
  template: `
    <div class="trm-about">
      <mat-card fxLayout="column" fxFlex fxLayoutAlign="center center">
        <h2 mat-card-title>Angular Master Class</h2>
        <mat-card-content>
          <img src="/assets/images/team.jpg" alt="Team thoughtram">
          <p style="text-align: center;">Brought to you by thoughtram</p>
        </mat-card-content>
        <mat-card-actions>
          <a mat-button title="Go back to Dashboard" routerLink="/">Go Back</a>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrls: ['./about.component.css']
})
export class AboutComponent {}
