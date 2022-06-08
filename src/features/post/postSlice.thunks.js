import { db } from "firebaseLocal";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

const createNewPost = createAsyncThunk(
  "thunk/createNewPost",
  async ({ uid, postInfo }, { rejectWithValue }) => {
    try {
      const post = await addDoc(collection(db, "posts"), {
        ...postInfo,
      });
      const usersDocRef = doc(db, "users", uid);
      await updateDoc(usersDocRef, {
        posts: arrayUnion(post.id),
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
  async ({ uid, postId }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      const usersDocRef = doc(db, "users", uid);
      await updateDoc(usersDocRef, {
        posts: arrayRemove(postId),
      });
      return { postId: postId };
    } catch (error) {
      return rejectWithValue(error.message ?? "Error Message NA");
    }
  }
);

export { createNewPost, updatePost, deletePost };
