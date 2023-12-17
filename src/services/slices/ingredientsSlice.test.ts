import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import ingredientsReducer, {
  fetchIngredientsAsync,
  keepBun,
  keepIngredient,
  deleteIngredient,
  reorderIngredient,
  setCurrentIngredient,
  unsetCurrentIngredient,
  selectIngredients,
  chosenBun,
  chosenIngredients,
  currentIngredient,
} from "./ingredientsSlice";
import { AnyAction } from "redux";

describe("ingredientsSlice", () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredients: ingredientsReducer,
      },
    });
  });

  test("fetchIngredientsAsync should dispatch the correct actions", async () => {
    await store.dispatch(fetchIngredientsAsync() as unknown as AnyAction);
    const ingredients = selectIngredients(store.getState());
    expect(ingredients.length).toBeGreaterThan(0);
  });

  test("keepBun should update the chosenBun state", () => {
    const bun = {
      id: "abc123",
      _id: "abc123",
      name: "bun",
      type: "bun",
      proteins: 11,
      fat: 11,
      carbohydrates: 11,
      calories: 11,
      price: 123,
      image: "image.com",
      image_mobile: "image.com",
      image_large: "image.com",
      __v: 123,
    };
    store.dispatch(keepBun(bun));
    const selectedBun = chosenBun(store.getState());
    expect(selectedBun).toEqual(bun);
  });

  test("keepIngredient should update the chosenIngredients state", () => {
    const ingredient = {
      id: "abc123",
      _id: "abc123",
      name: "bun",
      type: "bun",
      proteins: 11,
      fat: 11,
      carbohydrates: 11,
      calories: 11,
      price: 123,
      image: "image.com",
      image_mobile: "image.com",
      image_large: "image.com",
      __v: 123,
    };
    store.dispatch(keepIngredient(ingredient));
    const selectedIngredient = chosenIngredients(store.getState());
    expect(selectedIngredient.length).toEqual(1);
  });

  test("deleteIngredient should update the chosenIngredients state", () => {
    const ingredient = {
      id: "abc123",
      _id: "abc123",
      name: "bun",
      type: "bun",
      proteins: 11,
      fat: 11,
      carbohydrates: 11,
      calories: 11,
      price: 123,
      image: "image.com",
      image_mobile: "image.com",
      image_large: "image.com",
      __v: 123,
    };
    store.dispatch(keepIngredient(ingredient));
    const selectedIngredient = chosenIngredients(store.getState());
    expect(selectedIngredient.length).toEqual(1);
    store.dispatch(deleteIngredient(ingredient));
    const selectedIngredientAfterDelete = chosenIngredients(store.getState());
    expect(selectedIngredientAfterDelete.length).toEqual(0);
  });

  test("reorderIngredient should update the chosenIngredients state", () => {
    const ingredient = {
      id: "abc123",
      _id: "abc123",
      name: "bun",
      type: "bun",
      proteins: 11,
      fat: 11,
      carbohydrates: 11,
      calories: 11,
      price: 123,
      image: "image.com",
      image_mobile: "image.com",
      image_large: "image.com",
      __v: 123,
    };
    store.dispatch(keepIngredient(ingredient));
    const selectedIngredient = chosenIngredients(store.getState());
    expect(selectedIngredient.length).toEqual(1);
    store.dispatch(reorderIngredient({ from: 0, to: 1 }));
    const selectedIngredientAfterReorder = chosenIngredients(store.getState());
    expect(selectedIngredientAfterReorder.length).toEqual(1);
  });

  test("setCurrentIngredient should update the currentIngredient state", () => {
    const ingredient = {
      id: "abc123",
      _id: "abc123",
      name: "bun",
      type: "bun",
      proteins: 11,
      fat: 11,
      carbohydrates: 11,
      calories: 11,
      price: 123,
      image: "image.com",
      image_mobile: "image.com",
      image_large: "image.com",
      __v: 123,
    };
    store.dispatch(setCurrentIngredient(ingredient));
    const selectedIngredient = currentIngredient(store.getState());
    expect(selectedIngredient).toEqual(ingredient);
  });

  test("unsetCurrentIngredient should update the currentIngredient state", () => {
    const ingredient = {
      id: "abc123",
      _id: "abc123",
      name: "bun",
      type: "bun",
      proteins: 11,
      fat: 11,
      carbohydrates: 11,
      calories: 11,
      price: 123,
      image: "image.com",
      image_mobile: "image.com",
      image_large: "image.com",
      __v: 123,
    };
    store.dispatch(setCurrentIngredient(ingredient));
    const selectedIngredient = currentIngredient(store.getState());
    expect(selectedIngredient).toEqual(ingredient);
    store.dispatch(unsetCurrentIngredient());
    const selectedIngredientAfterUnset = currentIngredient(store.getState());
    expect(selectedIngredientAfterUnset).toEqual(null);
  });
});
