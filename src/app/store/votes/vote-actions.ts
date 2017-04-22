import { VoterService } from './voter.service';

export interface Action {
  type: any;
  counter?: number;
  station?: VoterService;
}

export const VoteActions = {
  NO: "NO",
  YES: "YES",
  LOAD: "LOAD",
  LOADED: "LOADED"
};

export function voteYesAction(station: VoterService) {
  return (dispatch) => {
    return station.addVote().subscribe(counter => {
      // After async response, dispatch sync data-ready
      dispatch(votesLoadedAction(counter))
    });
  };
}

export function voteNoAction(station: VoterService) {
  return (dispatch) => {
    station.removeVote().subscribe(counter => {
      // After async response, dispatch sync data-ready
      dispatch(votesLoadedAction(counter))
    });
  };
}

export function loadVotesAction(station: VoterService) {
  return (dispatch, getState) => {
    station.getVotes().subscribe(counter => {
      // After async response, dispatch sync data-ready
      dispatch(votesLoadedAction(counter))
    });
  };
}

export function votesLoadedAction(counter: number): Action {
  return { type: VoteActions.LOADED, counter };
}

