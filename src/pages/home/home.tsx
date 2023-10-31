import { useEffect } from "react";

import HomeStyles from "./home.module.css";

import { BurgerIngredients, BurgerConstructor } from "../../components";

import { useAppSelector, useAppDispatch } from "../../hooks";

import {
  fetchIngredientsAsync,
  selectIngredients,
} from "../../services/slices/ingredientsSlice";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const Home = () => {
  const dispatch = useAppDispatch();

  const ingredients = useAppSelector(selectIngredients);
  const status = useAppSelector((state) => state.ingredients.status);
  const error = useAppSelector((state) => state.ingredients.error);

  useEffect(() => {
    dispatch(fetchIngredientsAsync());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <main className={HomeStyles.main}>
      <DndProvider backend={HTML5Backend}>
        {ingredients.length && <BurgerIngredients ingredients={ingredients} />}
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
};
