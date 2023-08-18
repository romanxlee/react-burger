import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIngredients } from "../api";
import type { Ingredient } from "../../types";
import type { RootState } from "./index";

type IngredientsState = {
    ingredients: Ingredient[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error?: string
}

const initialState: IngredientsState = {
    ingredients: [],
    status: 'idle'
};

export const fetchIngredientsAsync = createAsyncThunk(
    'ingredients/fetchIngredients',
    async () => {
        return await fetchIngredients();
    }
);

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredientsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchIngredientsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ingredients = action.payload;
            })
            .addCase(fetchIngredientsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const selectIngredients = (state: RootState) => state.ingredients.ingredients;

export default ingredientsSlice.reducer;