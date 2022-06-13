import {
  authReducer,
  profileReducer,
  postReducer,
  postModalReducer,
  commentReducer,
} from "features";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    postModal: postModalReducer,
    comment: commentReducer,
  },
});

export { store };
