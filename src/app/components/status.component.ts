import { Component, Inject } from '@angular/core';

import { Store } from '../store/store';
import { APP_STORE } from '../store/app-store';
import { ApplicationState } from '../store/root.reducer';
import { loadTotalVotesAction } from '../store/votes/vote-actions';
import { VoterService } from '../store/votes/voter.service';

@Component({
  selector: 'trm-status',
  template: `
    {{ state?.counter }}
    <div class="tip">All Votes!</div>
  `,
  styles : [
    `:host {  text-align:center; font-size:1.1em; font-weight: bolder  }`,
    `.tip { font-size:0.7em; padding-top:5px;font-weight: normal;  }`
  ]
})
export class StatusComponent {

  state;

  /**
   * Inject the appStore here and listen
   * for vote changes!
   */
  constructor(
        private voteStation: VoterService,
        @Inject(APP_STORE) private store: Store<ApplicationState>) {

    store.dispatch(loadTotalVotesAction(voteStation));

    store.subscribe(() => {
      this.state = store.getState().votes;
    })
  }
}

