export const VoteActions = {
  NO: 'NO',
  YES: 'YES'
};

/**
 * To emulate a Redux store, simply
 * support the dispatch(), subscribe() methods and
 * use reducers to process actions with immutable instances
 */
export class AppStore {

  /**
   * Accessor to current store state
   */
  getState():any {
    return this.state;
  }

  /**
   *  Dispatch the action thru reducers to
   *  condistionally update the state
   */
  dispatch(action) {
    const newState = this.reducer(this.state, action);
    if (newState !== this.state) {
      this.state = newState;
      this.listeners.forEach(notify => notify());
    }
  }

  /**
   * Allow views to listen for store synchronous
   * store changes
   */
  subscribe(notify) {
    this.listeners.push(notify);
  }

  /**
   * Use the custom actions to update the counter state!
   *
   * @TODO - add your custom actions here!
   */
  protected reducer(state, action){
    switch(action) {
      case VoteActions.NO: return { ...state, counter: state.counter - 1 };
      case VoteActions.YES: return { ...state, counter: state.counter + 1 };
      default : return state;
    }
  }

  protected listeners = [];
  protected state = {
    counter : 0
  };

}


