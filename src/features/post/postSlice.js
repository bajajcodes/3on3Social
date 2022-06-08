import { createNewPost, updatePost, deletePost } from "./postSlice.thunks";
import {
  thunkLoading,
  thunkFulfilled,
  thunkRejected,
} from "features/thunks.helpers";
import { createSlice } from "@reduxjs/toolkit";

const name = "post";
const initialState = {
  status: "idle",
  hasError: false,
  message: "",
  postId: null,
  posts: [],
};

const postSlice = createSlice({
  name,
  initialState,
  reducers: {
    updatePostStatus: (state, action) => {
      state.status = action.payload.status;
    },
    updatePostsArray: (state, action) => {
      state.status = action.payload.status;
      state.posts = action.payload.posts;
    },
  },
  extraReducers: {
    [createNewPost.pending]: (state) => {
      thunkLoading(state);
    },
    [createNewPost.fulfilled]: (state, action) => {
      thunkFulfilled(state, "New Post Created", action.payload, "postId");
    },
    [createNewPost.rejected]: (state, action) => {
      thunkRejected(state, action, "postId", null);
    },
    [updatePost.pending]: (state) => {
      thunkLoading(state);
    },
    [updatePost.fulfilled]: (state, action) => {
      thunkFulfilled(state, "Post Updated", action.payload, "postId");
    },
    [updatePost.rejected]: (state, action) => {
      thunkRejected(state, action, "postId", null);
    },
    [deletePost.pending]: (state) => {
      thunkLoading(state);
    },
    [deletePost.fulfilled]: (state, action) => {
      thunkFulfilled(state, "Post Deleted", action.payload, "postId");
    },
    [deletePost.rejected]: (state, action) => {
      thunkRejected(state, action, "postId", null);
    },
  },
});

const postReducer = postSlice.reducer;
const { updatePostStatus, updatePostsArray } = postSlice.actions;

export { postReducer, updatePostStatus, updatePostsArray };
