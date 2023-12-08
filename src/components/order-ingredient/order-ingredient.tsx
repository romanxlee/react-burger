import { type FC } from "react";
import { Ingredient } from "../../types";
import styles from "./order-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrderIngredient extends Partial<Ingredient> {
  amount: number;
}

type Props = {
  ingredient: IOrderIngredient;
};

export const OrderIngredient: FC<Props> = ({ ingredient }) => {
  return (
    <div className={styles.root}>
      <div className={styles.block}>
        <img src={ingredient.image} alt="" className={styles.image} />
        <span className="text text_type_main-default ml-4">
          {ingredient.name}
        </span>
      </div>
      <div className={styles.price}>
        <span className="text text_type_digits-default">{`${ingredient.amount} x ${ingredient.price}`}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};
