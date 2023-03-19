import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/models/User";

const initialState: User = {
  _id: "",
  full_name: "",
  phone_number: "",
  email: "",
  role: "",
  isBlocked: false,
  status: false,
  created_at: "",
  updated_at: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      const {
        _id,
        full_name,
        phone_number,
        email,
        role,
        isBlocked,
        status,
        created_at,
        updated_at,
      } = action.payload;
      state._id = _id;
      state.full_name = full_name;
      state.phone_number = phone_number;
      state.email = email;
      state.role = role;
      state.isBlocked = isBlocked;
      state.status = status;
      state.created_at = created_at;
      state.updated_at = updated_at;
    },
    deleteUserInfo: (state) => {
      state._id = "";
      state.full_name = "";
      state.phone_number = "";
      state.email = "";
      state.role = "";
      state.isBlocked = false;
      state.status = false;
      state.created_at = "";
      state.updated_at = "";
    },
  },
});

export const { setUserInfo, deleteUserInfo } = userSlice.actions;

export default userSlice.reducer;
