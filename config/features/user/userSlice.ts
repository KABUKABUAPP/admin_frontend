import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    user: {}
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUserInfo: (state, payload:PayloadAction<any>) => {
            state.user = payload
        }
    }
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer