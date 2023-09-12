import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Order } from "../../types";
import { createOrder } from "../api";
import {RootState} from "./index";

interface OrderState {
    order: Order | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error?: string
}

const initialState: OrderState = {
    order: null,
    status: 'idle',
}

export const fetchOrder = createAsyncThunk(
    'orders/fetchOrder',
    async (ingredients: string[]) => await createOrder(ingredients)
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload)
                state.order = action.payload;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const orderDetail = (state: RootState) => state.orders.order

export default orderSlice.reducer;