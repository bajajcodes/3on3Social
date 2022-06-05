import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebaseLocal";
import { doc, updateDoc } from "firebase/firestore";

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

export { updatedUserProfile };
