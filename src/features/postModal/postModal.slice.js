import { createSlice } from "@reduxjs/toolkit";

const name = "postModal";
const initialState = {
  status: "idle",
  hasError: false,
  message: "",
  info: {},
  postId: null,
  show: false,
  display: "hidden",
};

const postModalSlice = createSlice({
  name,
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.status = "success";
      state.hasError = false;
      state.message = "Displaying Post Modal";
      state.info = action.payload?.info ?? {};
      state.postId = action.payload?.postId ?? null;
      state.show = true;
      state.display = "block";
    },
    closeModal: (state) => {
      state.status = "success";
      state.hasError = false;
      state.message = "Hidden Post Modal";
      state.info = {};
      state.postId = null;
      state.show = false;
      state.display = "hidden";
    },
  },
});

const postModalReducer = postModalSlice.reducer;
const { openModal, closeModal } = postModalSlice.actions;

export { postModalReducer, openModal, closeModal };
