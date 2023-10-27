import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRegister, userLogin } from "../api/auth";
import { RootState } from "./index";
import { User } from "../../types";

type AuthState = {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  isLogged: boolean;
  error?: string;
};

const initialState: AuthState = {
  user: null,
  isLogged: false,
  status: "idle",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: { email: string; password: string; name: string }) => {
    return await userRegister(user.email, user.password, user.name);
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: { email: string; password: string }) => {
    return await userLogin(user.email, user.password);
  },
);

export const registrationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle login actions
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLogged = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const currentUser = (state: RootState) => state.auth.user;
export const isLogged = (state: RootState) => state.auth.isLogged;

export default registrationSlice.reducer;
