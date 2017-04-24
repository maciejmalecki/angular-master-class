export const VoteActions = {
  NO: "NO",
  YES: "YES"
};

export interface Action {
  type: string;
}

export function voteYesAction() {
  return { type : VoteActions.YES };
}

export function voteNoAction() {
  return { type : VoteActions.NO };
}


