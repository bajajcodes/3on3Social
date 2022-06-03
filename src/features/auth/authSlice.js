import { LocalStorage } from "utils";
import { getAuthInitialState } from "./auth.helpers";
import { signupUser, loginUser, logoutUser } from "./authSlice.thunks";
import { thunkRejected } from "./authSlice.thunks.helpers";
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
  reducers: {
    loggedIn: (state, action) => {
      state.status = "success";
      state.hasError = false;
      state.isLoggedIn = true;
      state.uid = action.payload.uid;
      LocalStorage.set("auth", {
        isLoggedIn: state.isLoggedIn,
        uid: state.uid,
      });
    },
  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      thunkLoading(state);
    },
    [signupUser.fulfilled]: (state) => {
      state.message = "Successful Signup";
    },
    [signupUser.rejected]: (state, action) => {
      thunkRejected(state, action);
    },
    [loginUser.pending]: (state) => {
      thunkLoading(state);
    },
    [loginUser.fulfilled]: (state) => {
      state.message = "Successful Login";
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
const { loggedIn } = authSlice.actions;

export { authReducer, signupUser, loginUser, logoutUser, loggedIn };
