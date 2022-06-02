import { LocalStorage } from "utils";
import { getAuthInitialState } from "./auth.helpers";
import { signupUser, loginUser, logoutUser } from "./authSlice.thunks";
import { thunkFulFilled, thunkRejected } from "./authSlice.thunks.helpers";
import { thunkLoading } from "features/thunks.helpers";
import { createSlice } from "@reduxjs/toolkit";

const initialStateAuthSlice = getAuthInitialState();
const initialState = {
  ...initialStateAuthSlice,
  hasError: false,
  status: "idle",
  message: "",
};

const name = "auth";

const authSlice = createSlice({
  name,
  initialState,
  extraReducers: {
    [signupUser.pending]: (state) => {
      thunkLoading(state);
    },
    [signupUser.fulfilled]: (state, action) => {
      thunkFulFilled(state, action, "Successful Signup");
    },
    [signupUser.rejected]: (state, action) => {
      thunkRejected(state, action);
    },
    [loginUser.pending]: (state) => {
      thunkLoading(state);
    },
    [loginUser.fulfilled]: (state, action) => {
      thunkFulFilled(state, action, "Successful Login");
    },
    [loginUser.rejected]: (state, action) => {
      thunkRejected(state, action);
    },
    [logoutUser.pending]: (state) => {
      thunkLoading(state);
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.status = "idle";
      state.hasError = false;
      state.message = "";
      state.isLoggedIn = false;
      state.uid = action.payload.uid;
      LocalStorage.clear();
    },
    [logoutUser.rejected]: (state, action) => {
      thunkRejected(state, action);
    },
  },
});


const authReducer = authSlice.reducer;

export { authReducer, signupUser, loginUser, logoutUser };
