import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Order, Status } from "../../types";
import { createOrder } from "../api";
import { RootState } from "./index";

interface OrderState {
  order: Order | null;
  status: Status;
  error?: string;
}

export const initialState: OrderState = {
  order: null,
  status: "idle",
};

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (ingredients: string[]) => await createOrder(ingredients),
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const orderDetail = (state: RootState) => state.orders.order;
export const orderStatus = (state: RootState) => state.orders.status;

export default orderSlice.reducer;
