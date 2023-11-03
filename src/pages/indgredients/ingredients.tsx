import { IngredientDetails } from "../../components";
import styles from "./ingredients.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectIngredients,
  setCurrentIngredient,
} from "../../services/slices/ingredientsSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const Ingredients = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(selectIngredients);
  const current = ingredients.filter((item) => item._id === id)[0];

  useEffect(() => {
    dispatch(setCurrentIngredient(current));
  }, [dispatch, current]);

  return (
    <div className={styles.root}>
      <span className="text text_type_main-medium">Детали ингредиента</span>
      <IngredientDetails />
    </div>
  );
};
