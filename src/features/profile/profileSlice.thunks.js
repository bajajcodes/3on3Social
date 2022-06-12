import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebaseLocal";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const updatedUserProfile = createAsyncThunk(
  "thunk/updateUserProfile",
  async (userInfo, { rejectWithValue }) => {
    try {
      const usersDocRef = doc(db, "users", userInfo.uid);
      delete userInfo.uid;
      await updateDoc(usersDocRef, {
        ...userInfo,
      });
    } catch (error) {
      return rejectWithValue(error.message ?? "Error Message NA");
    }
  }
);

const followUser = createAsyncThunk(
  "thunk/followUser",
  async ({ following, follower }, { rejectWithValue }) => {
    try {
      let followerDocRef = doc(db, "users", follower.uid);
      let followingDocRef = doc(db, "users", following.uid);
      await updateDoc(followerDocRef, {
        following: arrayUnion(following.username),
      });
      await updateDoc(followingDocRef, {
        followers: arrayUnion(follower.username),
      });
    } catch (error) {
      return rejectWithValue(error.message ?? "Error Message NA");
    }
  }
);

const unFollowUser = createAsyncThunk(
  "thunk/unFollowUser",
  async ({ following, follower }, { rejectWithValue }) => {
    try {
      let followerDocRef = doc(db, "users", follower.uid);
      let followingDocRef = doc(db, "users", following.uid);
      await updateDoc(followerDocRef, {
        following: arrayRemove(following.username),
      });
      await updateDoc(followingDocRef, {
        followers: arrayRemove(follower.username),
      });
    } catch (error) {
      return rejectWithValue(error.message ?? "Error Message NA");
    }
  }
);

export { updatedUserProfile, followUser, unFollowUser };
