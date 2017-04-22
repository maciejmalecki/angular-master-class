import { Component } from '@angular/core';
import { AppStore, VoteActions } from '../store/app-store';

@Component({
  selector: 'trm-voter',
  template: `
    <div fxLayout="column" fxLayoutAlign="space-between center" fxFlex style="padding-left:10px;">
      <button mat-fab class="yes" matTooltip="Vote Yes!" (click)="increment()">
        <mat-icon class="md-24">thumb_up</mat-icon>
      </button>

      <ng-content></ng-content>

      <button mat-fab class="no" matTooltip="Vote No!" (click)="decrement()">
        <mat-icon class="md-24">thumb_down</mat-icon>
      </button>
    </div>
  `,
  styles : [
    `button.yes { background-color: darkgreen; }`,
    `button.no { background-color: red; }`
  ]
})
export class VoterComponent {

  /**
   * Inject the appstore
   */
  constructor(private store: AppStore) { }

  private increment() {
    this.store.dispatch(VoteActions.YES);
  }

  private decrement() {
    this.store.dispatch(VoteActions.NO);
  }
}

