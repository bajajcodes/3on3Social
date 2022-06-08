function thunkLoading(state) {
  state.status = "loading";
  state.message = "Loading";
}

function thunkFulfilled(state, message, payload, keyValueName) {
  state.status = "success";
  state.hasError = false;
  state.message = message;
  state[keyValueName] = payload[keyValueName];
}

function thunkRejected(state, action, keyValueName, rejectValue) {
  state.status = "failed";
  state.hasError = false;
  if (action.payload) {
    state.message = action.payload;
  } else {
    state.message = action.error.message;
  }
  state[keyValueName] = rejectValue;
}

export { thunkLoading, thunkFulfilled, thunkRejected };
