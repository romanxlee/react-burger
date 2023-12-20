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
import { TEST_DATA } from "../../utils/consts";

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
    store.dispatch(keepBun(TEST_DATA));
    const selectedBun = chosenBun(store.getState());
    expect(selectedBun).toEqual(TEST_DATA);
  });

  test("keepIngredient should update the chosenIngredients state", () => {
    store.dispatch(keepIngredient(TEST_DATA));
    const selectedIngredient = chosenIngredients(store.getState());
    expect(selectedIngredient.length).toEqual(1);
  });

  test("deleteIngredient should update the chosenIngredients state", () => {
    store.dispatch(keepIngredient(TEST_DATA));
    const selectedIngredient = chosenIngredients(store.getState());
    expect(selectedIngredient.length).toEqual(1);
    store.dispatch(deleteIngredient(TEST_DATA));
    const selectedIngredientAfterDelete = chosenIngredients(store.getState());
    expect(selectedIngredientAfterDelete.length).toEqual(0);
  });

  test("reorderIngredient should update the chosenIngredients state", () => {
    store.dispatch(keepIngredient(TEST_DATA));
    const selectedIngredient = chosenIngredients(store.getState());
    expect(selectedIngredient.length).toEqual(1);
    store.dispatch(reorderIngredient({ from: 0, to: 1 }));
    const selectedIngredientAfterReorder = chosenIngredients(store.getState());
    expect(selectedIngredientAfterReorder.length).toEqual(1);
  });

  test("setCurrentIngredient should update the currentIngredient state", () => {
    store.dispatch(setCurrentIngredient(TEST_DATA));
    const selectedIngredient = currentIngredient(store.getState());
    expect(selectedIngredient).toEqual(TEST_DATA);
  });

  test("unsetCurrentIngredient should update the currentIngredient state", () => {
    store.dispatch(setCurrentIngredient(TEST_DATA));
    const selectedIngredient = currentIngredient(store.getState());
    expect(selectedIngredient).toEqual(TEST_DATA);
    store.dispatch(unsetCurrentIngredient());
    const selectedIngredientAfterUnset = currentIngredient(store.getState());
    expect(selectedIngredientAfterUnset).toEqual(null);
  });
});
