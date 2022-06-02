import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "firebaseLocal";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
        following: [],
        followers: [],
        posts: [],
        likes: [],
        comments: [],
        bookmarks: [],
        authProvider: "local",
        dateCreated: new Date().toDateString(),
      });
      return { uid };
    } catch (error) {
      return rejectWithValue(error.message ?? "Error Message NA");
    }
  }
);

export { signupUser };
