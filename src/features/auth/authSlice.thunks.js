import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "firebaseLocal";
import { createUserProfile } from "./authSlice.thunks.helpers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const signupUser = createAsyncThunk(
  "thunk/createUserWithEmailAndPassword",
  async (userInfo, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      const userProfile = createUserProfile(
        userInfo.name,
        userInfo.username,
        userInfo.email
      );
      const uid = userCredential.user.uid;
      await setDoc(doc(db, "users", uid), userProfile);
    } catch (error) {
      return rejectWithValue(error.message ?? "Error Message NA");
    }
  }
);

const loginUser = createAsyncThunk(
  "thunk/signInWithEmailAndPassword",
  async (userInfo, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
    } catch (error) {
      return rejectWithValue(error.message ?? "Error Message NA");
    }
  }
);

const logoutUser = createAsyncThunk(
  "thunk/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return { uid: null };
    } catch (error) {
      return rejectWithValue(error.message ?? "Error Message NA");
    }
  }
);

export { signupUser, loginUser, logoutUser };
