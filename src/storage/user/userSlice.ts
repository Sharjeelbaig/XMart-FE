import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  email: string;
  profilePicture: string;
}

const initialState: UserState = {
  name: "",
  email: "",
  profilePicture: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profilePicture = action.payload.profilePicture;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
