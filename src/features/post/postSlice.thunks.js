import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebaseLocal";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const createNewPost = createAsyncThunk(
  "thunk/createNewPost",
  async (postInfo, { rejectWithValue }) => {
    try {
      const post = await addDoc(collection(db, "posts"), {
        ...postInfo,
      });
      return { postId: post.id };
    } catch (error) {
      return rejectWithValue(error.message ?? "Error Message NA");
    }
  }
);

const updatePost = createAsyncThunk(
  "thunk/updatePost",
  async ({ postId, postInfo }, { rejectWithValue }) => {
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        ...postInfo,
      });
      return { postId: postId };
    } catch (error) {
      return rejectWithValue(error.message ?? "Error Message NA");
    }
  }
);

const deletePost = createAsyncThunk(
  "thunk/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      return { postId: postId };
    } catch (error) {
      return rejectWithValue(error.message ?? "Error Message NA");
    }
  }
);

export { createNewPost, updatePost, deletePost };
