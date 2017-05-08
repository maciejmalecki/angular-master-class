import { Action, VoteActions } from './vote-actions';
import { INITIAL_VOTES_STATE, VotesState } from 'app/store/votes/vote-state';

/**
 * Use the custom actions to update the counter state!
 */
export function voteReducer(state: VotesState = INITIAL_VOTES_STATE, action: Action) {
  switch (action.type) {
    case VoteActions.YES_VOTE.SUCCESS:
    case VoteActions.NO_VOTE.SUCCESS:
    case VoteActions.TOTAL_VOTES.SUCCESS:
      return {...state, counter: action.payload };
    default:
      return state;
  }
}
