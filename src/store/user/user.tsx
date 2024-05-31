import {createSlice} from "@reduxjs/toolkit";

interface UserState {
  id: number,
  token: string,
  login: string,
  languageId: number,
  locationId: number,
  isSignedIn: boolean,
}

const initialState: UserState = {
  id: 0,
  isSignedIn: false,
  languageId: 1,
  locationId: 0,
  login: "",
  token: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action)=>{
      state = action.payload;
      state.isSignedIn = true;
    },
    logout: (state) =>{
      state = initialState;
    }
  }
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;


  
