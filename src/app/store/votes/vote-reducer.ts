import { Action, VoteActions } from './vote-actions';
import { INITIAL_VOTES_STATE, VotesState } from 'app/store/votes/vote-state';

/**
 * Use the custom actions to update the counter state!
 */
export function voteReducer(state: VotesState = INITIAL_VOTES_STATE, action: Action) {
  switch (action.type) {
    case VoteActions.LOADED: return {...state, counter: action.counter };
    default:  return state;
  }
}
