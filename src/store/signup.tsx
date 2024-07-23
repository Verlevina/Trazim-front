import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const signUpSlice = createSlice({
  name: "singUpSlice",
  initialState,
  reducers: {
    toggleSignUPModal: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { toggleSignUPModal } = signUpSlice.actions;
export default signUpSlice.reducer;
