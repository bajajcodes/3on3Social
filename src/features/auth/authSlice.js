import { getAuthInitialState } from "./auth.helpers";
import { signupUser } from "./authSlice.thunks";
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
  reducers: {},
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
  },
});

const authReducer = authSlice.reducer;

export { authReducer, signupUser };
