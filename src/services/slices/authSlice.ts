import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRegister } from "../api/auth";

export const registerUser = createAsyncThunk(
  "jwtRegistration/registerUser",
  async (user: { email: string; password: string; name: string }, thunkAPI) => {
    try {
      const response = await userRegister(user.email, user.password, user.name);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const registrationSlice = createSlice({
  name: "jwtRegistration",
  initialState: { entities: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = "waiting";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = "idle";
        state.entities.push(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload.error;
      });
  },
});

export default registrationSlice.reducer;
