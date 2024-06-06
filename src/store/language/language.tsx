import {createSlice} from "@reduxjs/toolkit";
import { LangugeArray } from "../../constants/languages";

const initialState: string = LangugeArray[1];

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguageReducer: (state, action)=>{
      return action.payload;
    }
  }
})

export const { setLanguageReducer } = languageSlice.actions;
export default languageSlice.reducer;


  
