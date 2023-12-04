import styles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FeedOrder } from "../../types";
import { type FC, useMemo } from "react";
import { useAppSelector } from "../../hooks";
import { selectIngredients } from "../../services/slices/ingredientsSlice";
import { v4 as uuid } from "uuid";

type Props = {
  order: FeedOrder;
  isProfile?: boolean;
};

export const OrderCard: FC<Props> = ({ order, isProfile }) => {
  const ingredients = useAppSelector(selectIngredients);
  const { ingredientsData, restAmount, allIngredients } = useMemo(() => {
    const allIngredients = order.ingredients
      .map((id) => {
        return {
          ...ingredients.find((ingredient) => ingredient._id === id),
          uniqId: uuid(),
        };
      })
      .filter((element) => element !== undefined);

    const ingredientsData = order.ingredients.slice(0, 6).map((id) => {
      return {
        ...ingredients.find((ingredient) => ingredient._id === id),
        uniqId: uuid(),
      };
    });

    const rest = order.ingredients.length - ingredientsData.length;

    return {
      ingredientsData: ingredientsData,
      restAmount: rest,
      allIngredients: allIngredients,
    };
  }, []);

  const ordersStatuses: Record<string, string> = {
    done: "Выполнен",
    pending: "Готовится",
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardSection}>
        <span className="text text_type_digits-default text_type_main-small">
          {"#" + order.number}
        </span>
        <span className="text text_type_main-small text_color_inactive">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      </div>
      <span className="text text_type_main-small">{order.name}</span>
      {isProfile && (
        <span
          className={`${
            order.status === "done" && "text_color_success"
          } text text_type_main-small`}
        >
          {ordersStatuses[order.status]}
        </span>
      )}
      <div className={styles.cardSection}>
        <div className={styles.ingredients}>
          {ingredientsData &&
            ingredientsData.map((ingredient, index) => (
              <div
                key={ingredient.uniqId}
                style={{ zIndex: ingredientsData.length - index }}
                className={styles.circle}
              >
                <img src={ingredient.image_mobile} alt="" />
                {restAmount > 0 && index === ingredientsData.length - 1 && (
                  <div
                    className={`${styles.overlay} text text_type_digits-default`}
                  >{`+${restAmount}`}</div>
                )}
              </div>
            ))}
        </div>
        <div className={styles.price}>
          <span className="text text_type_digits-default">
            {allIngredients
              ? allIngredients.reduce((acc, val) => {
                  if (val.price) {
                    return acc + val!.price;
                  }

                  return 0;
                }, 0)
              : 0}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
