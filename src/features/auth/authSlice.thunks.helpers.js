import { LocalStorage } from "utils";
import { serverTimestamp } from "firebase/firestore";

function thunkFulFilled(state, action, message) {
  state.status = "success";
  state.hasError = false;
  state.message = message;
  state.isLoggedIn = true;
  state.uid = action.payload.uid;
  LocalStorage.set("auth", {
    isLoggedIn: state.isLoggedIn,
    uid: state.uid,
  });
}

function thunkRejected(state, action) {
  state.status = "failed";
  state.hasError = true;
  if (action.payload) {
    state.message = action.payload;
  } else {
    state.message = action.error.message;
  }
  state.isLoggedIn = false;
  state.uid = null;
  LocalStorage.set("auth", {
    isLoggedIn: state.isLoggedIn,
    uid: state.uid,
  });
}

function createUserProfile(name, username, email) {
  return {
    name,
    username,
    email,
    profileImageUrl: "",
    bio: "",
    website: "",
    following: [],
    followers: [],
    posts: [],
    likes: [],
    comments: [],
    bookmarks: [],
    authProvider: "local",
    createdAt: serverTimestamp(),
  };
}

export { thunkFulFilled, thunkRejected, createUserProfile };
