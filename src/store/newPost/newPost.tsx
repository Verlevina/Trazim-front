import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false

const newPostSlice = createSlice({
  name: "newPost",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state = action.payload;
      return state;
    }
  },
});

export const { toggleModal } = newPostSlice.actions;
export default newPostSlice.reducer;
