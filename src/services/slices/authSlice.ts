import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRegister, userLogin, userLogout } from "../api/auth";
import { getUser, updateUser } from "../api/user";
import { RootState } from "./index";
import { User, Status } from "../../types";

type AuthState = {
  user: User | null;
  status: Status;
  error?: string;
  isAuthChecked: boolean;
};

const initialState: AuthState = {
  user: null,
  status: "idle",
  isAuthChecked: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: { email: string; password: string; name: string }) => {
    return await userRegister(user.email, user.password, user.name);
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  return await userLogout();
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: { email: string; password: string }) => {
    return await userLogin(user.email, user.password);
  },
);

export const userInfo = createAsyncThunk("auth/userInfo", async () => {
  return await getUser();
});

export const userUpdate = createAsyncThunk(
  "auth/userUpdate",
  async (user: User) => {
    return await updateUser(user);
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
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
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
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle logout actions
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle get user info actions
      .addCase(userInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthChecked = true;
        state.error = action.error.message;
      })
      // Handle update user info actions
      .addCase(userUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const currentUser = (state: RootState) => state.auth.user;

export default registrationSlice.reducer;
