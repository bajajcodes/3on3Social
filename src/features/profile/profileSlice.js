import { updatedUserProfile } from "./profileSlice.thunks";
import { thunkLoading } from "features/thunks.helpers";
import { createSlice } from "@reduxjs/toolkit";

const name = "profile";
const initialState = {
  status: "idle",
  userInfo: {},
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
  },
});

const profileReducer = profileSlice.reducer;
const { updateProfileState } = profileSlice.actions;

export { profileReducer, updateProfileState };
