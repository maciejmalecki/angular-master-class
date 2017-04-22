export const logger = store => next => action => {
  logStart('logger', action);
      let result = next(action);
  logEnd(store);
  return result;
};

export const crashReporter = store => next => action => {
  try {
    logStart('crashReporter', action);
      let result = next(action);
    logEnd(store);
    return result;
  } catch (err) {
    console.error('Caught an exception!', err);
    throw err;
  }
};

function logStart(name: string, action) {
  console.group(`Redux Middleware [${name}]:`);
  console.log('dispatching', action);
}

function logEnd(store){
  console.log('next state ', store.getState());
  console.groupEnd();
}
