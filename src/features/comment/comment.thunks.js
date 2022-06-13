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

const postComment = createAsyncThunk(
  "thunk/postComment",
  async (commentInfo, { rejectWithValue }) => {
    try {
      const userDocRef = doc(db, "users", commentInfo.userInfo.uid);
      const postDocRef = doc(db, "posts", commentInfo.postId);
      const comment = await addDoc(collection(db, "comments"), {
        ...commentInfo,
      });
      await updateDoc(userDocRef, {
        comments: arrayUnion(comment.id),
      });
      await updateDoc(postDocRef, {
        comments: arrayUnion(comment.id),
      });
      return { commentId: comment.id };
    } catch (error) {
      return rejectWithValue(error?.message ?? "Error Message NA");
    }
  }
);

const deleteComment = createAsyncThunk(
  "thunk/deleteComment",
  async ({ commentId, postId, uid }, { rejectWithValue }) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const postDocRef = doc(db, "posts", postId);
      await deleteDoc(doc(db, "comments", commentId));
      await updateDoc(userDocRef, {
        posts: arrayRemove(postId),
      });
      await updateDoc(postDocRef, {
        posts: arrayRemove(postId),
      });
      return { commentId: commentId };
    } catch (error) {
      return rejectWithValue(error?.message ?? "Error Message NA");
    }
  }
);

const updateComment = createAsyncThunk(
  "thunk/UpdateComment",
  async ({ commentId, commentInfo }, { rejectWithValue }) => {
    try {
      const commentDocRef = doc(db, "comments", commentId);
      await updateDoc(commentDocRef, {
        ...commentInfo,
      });
      return { commentId: commentId };
    } catch (error) {
      return rejectWithValue(error?.message ?? "Error Message NA");
    }
  }
);

export { postComment, deleteComment, updateComment };
