import { createSlice } from "@reduxjs/toolkit";
import { subscribeTypes } from "../../constants/subscribeTypes";

export interface UserState {
  id: number;
  name: string;
  token: string;
  email: string;
  languageId: number;
  locationId: number;
  login: string;
  pictureUrl: string;
  surname: string;
  telegram: string;
  userRating: number;
  isSignedIn: boolean;
  subscribe: subscribeTypes[];
}

const initialState: UserState = {
  id: 0,
  isSignedIn: false,
  languageId: 1,
  locationId: 0,
  login: "",
  token: "",
  email: "",
  name: "",
  pictureUrl: "",
  surname: "",
  telegram: "",
  userRating: 0,
  subscribe: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state = action.payload;
      state.isSignedIn = true;
      state.subscribe = state.subscribe ?? [];
      return { ...state };
    },
    logoutReducer: (state) => {
      state = initialState;
      return { ...state };
    },
  },
});

export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
