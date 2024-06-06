import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user";
import languageReducer from "./language/language";

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
