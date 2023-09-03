import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchIngredients } from "../api";
import type { Ingredient } from "../../types";
import type { RootState } from "./index";

type IngredientsState = {
    ingredients: Ingredient[],
    chosenIngredients: Ingredient[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error?: string
}

const initialState: IngredientsState = {
    ingredients: [],
    chosenIngredients: [],
    status: 'idle',
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
    reducers: {
        keepIngredient: (state, action: PayloadAction<Ingredient>) => {
            state.chosenIngredients.push(action.payload);
        },
        deleteIngredient: (state, action: PayloadAction<Ingredient>) => {
            state.chosenIngredients = state.chosenIngredients.filter(ingredient => ingredient.id !== action.payload.id)
        }
    },
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

export const { keepIngredient, deleteIngredient } = ingredientsSlice.actions;

export const selectIngredients = (state: RootState) => state.ingredients.ingredients;
export const chosenIngredients = (state: RootState) => state.ingredients.chosenIngredients;
export const selectChosenIngredients = (state: RootState) => state.ingredients.chosenIngredients;

export default ingredientsSlice.reducer;