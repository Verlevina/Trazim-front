import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user";
import languageReducer from "./language/language";
import newPostReducer from "./newPost/newPost";
import filterReducer from "./filter/filter";
import signUpReducer from "./signup";

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
    newPost: newPostReducer,
    filter: filterReducer,
    singUp: signUpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
