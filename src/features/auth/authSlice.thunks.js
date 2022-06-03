import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "firebaseLocal";
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
      const uid = userCredential.user.uid;
      await setDoc(doc(db, "users", uid), {
        name: userInfo.name,
        username: userInfo.username,
        email: userInfo.email,
        profileImageUrl: "",
        bio: "",
        portfolioUrl: "",
        following: [],
        followers: [],
        posts: [],
        likes: [],
        comments: [],
        bookmarks: [],
        authProvider: "local",
        createdAt: new Date().toDateString(),
      });
    } catch (error) {
      return rejectWithValue(error.message ?? "Error Message NA");
    }
  }
);

const loginUser = createAsyncThunk(
  "login/signInWithEmailAndPassword",
  async (userInfo, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
    } catch (error) {
      return rejectWithValue(error.message ?? "Error Message NA");
    }
  }
);

const logoutUser = createAsyncThunk(
  "logout/signOut",
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
