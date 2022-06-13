import { postComment, deleteComment, updateComment } from "./comment.thunks";
import {
  thunkLoading,
  thunkFulfilled,
  thunkRejected,
} from "features/thunks.helpers";
import { createSlice } from "@reduxjs/toolkit";

const name = "comment";
const initialState = {
  status: "idle",
  hasError: false,
  message: "",
  commentId: null,
  comments: [],
};

const commentSlice = createSlice({
  name,
  initialState,
  reducers: {
    updateCommentStatus: (state, action) => {
      state.status = action.payload.status;
    },
  },
  extraReducers: {
    [postComment.pending]: (state) => {
      thunkLoading(state);
    },
    [postComment.fulfilled]: (state, action) => {
      thunkFulfilled(state, "New Comment Created", action.payload, "commentId");
    },
    [postComment.rejected]: (state, action) => {
      thunkRejected(state, action, "commentId", null);
    },
    [updateComment.pending]: (state) => {
      thunkLoading(state);
    },
    [updateComment.fulfilled]: (state, action) => {
      thunkFulfilled(state, "Comment Updated", action.payload, "commentId");
    },
    [updateComment.rejected]: (state, action) => {
      thunkRejected(state, action, "commentId", null);
    },
    [deleteComment.pending]: (state) => {
      thunkLoading(state);
    },
    [deleteComment.fulfilled]: (state, action) => {
      thunkFulfilled(state, "Comment Deleted", action.payload, "commentId");
    },
    [deleteComment.rejected]: (state, action) => {
      thunkRejected(state, action, "commentId", null);
    },
  },
});

const commentReducer = commentSlice.reducer;
const { updateCommentStatus } = commentSlice.actions;

export { commentReducer, updateCommentStatus };
