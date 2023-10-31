import { type FC, useMemo } from "react";
import BurgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import type { Ingredient } from "../../types";

import { useDrag } from "react-dnd";
import { useAppSelector } from "../../hooks";
import {
  chosenBun,
  chosenIngredients,
} from "../../services/slices/ingredientsSlice";

type Props = {
  ingredient: Ingredient;
  onCLick: (ingredient: Ingredient) => void;
};

export const IngredientCard: FC<Props> = (props) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: props.ingredient,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const bun = useAppSelector(chosenBun);
  const mainIngredients = useAppSelector(chosenIngredients);

  const count = useMemo(() => {
    if (props.ingredient.type === "bun" && props.ingredient.name === bun?.name)
      return 1;

    if (props.ingredient.type !== "bun") {
      return mainIngredients.filter(
        (ingredient) => ingredient.name === props.ingredient.name,
      ).length;
    } else return 0;
  }, [props.ingredient, bun, mainIngredients]);

  return (
    <div
      key={props.ingredient._id}
      className={BurgerIngredientsStyles.card}
      onClick={() => props.onCLick(props.ingredient)}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img
        src={props.ingredient.image}
        alt={`Изображение ${props.ingredient.name}`}
        className={BurgerIngredientsStyles.cardImage}
      />
      <div className={BurgerIngredientsStyles.price}>
        <span className="text text_type_digits-default mr-2">
          {props.ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <span
        key={props.ingredient._id}
        className={`${BurgerIngredientsStyles.name} text text_type_main-small`}
      >
        {props.ingredient.name}
      </span>
    </div>
  );
};
