import { voteReducer } from './votes/vote-reducer';
import { VotesState } from './votes/vote-state';

export interface ApplicationState {
  votes : VotesState
}

export const ROOT_REDUCER = {
  votes : voteReducer
};
