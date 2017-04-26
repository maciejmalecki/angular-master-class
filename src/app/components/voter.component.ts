import { Component, Inject } from '@angular/core';
import { Store } from '../store/store';
import { ApplicationState } from '../store/root.reducer';
import { APP_STORE } from '../store/app-store';
import { VoteActions } from '../store/votes/vote-actions';

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
  constructor(@Inject(APP_STORE) private store: Store<ApplicationState>) {
  }

  private increment() {
    this.store.dispatch({ type: VoteActions.YES });
  }

  private decrement() {
    this.store.dispatch({ type: VoteActions.NO });
  }
}

