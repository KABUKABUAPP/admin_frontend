import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthSlice } from "@/models/Auth";

const initialState: AuthSlice = {
  accessToken: "",
};

export const authSlice = createSlice({
  name: "authslice",
  initialState,
  reducers: {
    setTokenValue: (state, action: PayloadAction<string>)=>{
        state.accessToken = action.payload
    },
    deleteToken: (state)=>{
        state.accessToken = ''
    },
  }
});

export const { setTokenValue, deleteToken } = authSlice.actions

export default authSlice.reducer
