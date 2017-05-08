import {VoterService} from './voter.service';

export interface Action {
  type: any;
  payload?: any;
  server?: VoterService;
}

export const VoteActions = {
  YES_VOTE : {
    SUBMITTED  : "YES_VOTE_SUBMITTED",
    SUCCESS    : "YES_VOTE_ACCEPTED",
    ERROR      : "YES_VOTE_REJECTED"
  },
  NO_VOTE : {
    SUBMITTED  : "NO_VOTE_SUBMITTED",
    SUCCESS    : "NO_VOTE_ACCEPTED",
    ERROR      : "NO_VOTE_REJECTED"
  },
  TOTAL_VOTES  : {
    REQUESTED  : "LOAD_TOTAL_VOTES_REQUESTED",
    SUCCESS    : "LOAD_TOTAL_VOTES_SUCCESS",
    ERROR      : "LOAD_TOTAL_VOTES_SUCCESS"
  }
};

export function voteYesAction(server:VoterService) {
  return makeThunk(server.addVote(), VoteActions.YES_VOTE);
}

export function voteNoAction(server:VoterService) {
  return makeThunk(server.removeVote(), VoteActions.NO_VOTE);
}

export function loadTotalVotesAction(server:VoterService) {
  return makeThunk(server.getVotes(), VoteActions.TOTAL_VOTES);
}

// ************************************************************************
// Internal `makeThunk` method prepares async action function which
// will not only call remote service but will also dispatch the
// 'REQUESTED' action so UI make show background activity
// ************************************************************************

function makeThunk(response$, action) {
  // return an async thunk function
  return (dispatch) => {
    let onActionDone  = (total) => dispatch({ type:action.SUCCESS, payload:total });
    let onActionError = (error) => dispatch({ type:action.ERROR,  payload:error });

    dispatch( { type : action.REQUESTED || action.SUBMITTED } );
    return response$.subscribe(onActionDone, onActionError);
  }
}
