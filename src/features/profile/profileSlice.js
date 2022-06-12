import {
  updatedUserProfile,
  followUser,
  unFollowUser,
} from "./profileSlice.thunks";
import { thunkLoading } from "features/thunks.helpers";
import { createSlice } from "@reduxjs/toolkit";

const name = "profile";
const initialState = {
  status: "idle",
  userInfo: {},
  message: "",
};

const profileSlice = createSlice({
  name,
  initialState,
  reducers: {
    updateProfileState: (state, action) => {
      state.status = action.payload.status;
      if (action.payload.userInfo) {
        state.userInfo = action.payload.userInfo;
      }
    },
  },
  extraReducers: {
    [updatedUserProfile.pending]: (state) => {
      thunkLoading(state);
    },
    [updatedUserProfile.fulfilled]: (state) => {
      state.status = "success";
    },
    [updatedUserProfile.rejected]: (state) => {
      state.status = "failed";
    },
    [followUser.pending]: (state) => {
      thunkLoading(state);
    },
    [followUser.fulfilled]: (state) => {
      state.status = "success";
    },
    [followUser.rejected]: (state,action) => {
      state.status = "failed";
      if (action.payload) {
        state.message = action.payload;
      } else {
        state.message = action.error.message;
      }
    },
    [unFollowUser.pending]: (state) => {
      thunkLoading(state);
    },
    [unFollowUser.fulfilled]: (state) => {
      state.status = "success";
    },
    [unFollowUser.rejected]: (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.message = action.payload;
      } else {
        state.message = action.error.message;
      }
    },
  },
});

const profileReducer = profileSlice.reducer;
const { updateProfileState } = profileSlice.actions;

export { profileReducer, updateProfileState };
