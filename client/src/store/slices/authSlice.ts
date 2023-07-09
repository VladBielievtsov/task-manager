import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userInfo: UserInfo | null;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UserInfo {
  user: IUser;
  token: string;
}

const storedUserInfo = localStorage.getItem("userInfo");
const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

const initialState: AuthState = {
  userInfo: parsedUserInfo as UserInfo | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
