import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user";
import languageReducer from "./language/language";
import newPostReducer from "./newPost/newPost";

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
    newPost: newPostReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
