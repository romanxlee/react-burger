import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchIngredients } from "../api";
import type { Ingredient, Status } from "../../types";
import type { RootState } from "./index";

type IngredientsState = {
  ingredients: Ingredient[];
  chosenBun: Ingredient | null;
  chosenIngredients: Ingredient[];
  currentIngredient: Ingredient | null;
  status: Status;
  error?: string;
};

const initialState: IngredientsState = {
  ingredients: [],
  chosenBun: null,
  chosenIngredients: [],
  currentIngredient: null,
  status: "idle",
};

export const fetchIngredientsAsync = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    return await fetchIngredients();
  },
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    keepBun: (state, action: PayloadAction<Ingredient>) => {
      state.chosenBun = action.payload;
    },
    keepIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.chosenIngredients.push(action.payload);
    },
    deleteIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.chosenIngredients = state.chosenIngredients.filter(
        (ingredient) => ingredient.id !== action.payload.id,
      );
    },
    reorderIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>,
    ) => {
      const item = state.chosenIngredients.splice(action.payload.from, 1)[0];
      state.chosenIngredients.splice(action.payload.to, 0, item);
    },
    setCurrentIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.currentIngredient = action.payload;
    },
    unsetCurrentIngredient: (state) => {
      state.currentIngredient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIngredientsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredientsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  keepIngredient,
  keepBun,
  deleteIngredient,
  reorderIngredient,
  setCurrentIngredient,
  unsetCurrentIngredient,
} = ingredientsSlice.actions;

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const chosenIngredients = (state: RootState) =>
  state.ingredients.chosenIngredients;
export const chosenBun = (state: RootState) => state.ingredients.chosenBun;
export const currentIngredient = (state: RootState) =>
  state.ingredients.currentIngredient;

export default ingredientsSlice.reducer;
