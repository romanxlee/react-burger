import { FeedOrder, Ingredient } from "../../types";
import styles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderInfo } from "../../services/api";
import { useEffect, useState, useMemo, type FC } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { selectIngredients } from "../../services/slices/ingredientsSlice";
import { OrderIngredient } from "../order-ingredient/order-ingredient";

interface OrderIngredients extends Partial<Ingredient> {
  amount: number;
}

type Props = {
  number?: number | string;
  isModal?: boolean;
};

export const OrderInfo: FC<Props> = ({ number, isModal }) => {
  const { id } = useParams();
  const ordersStatuses: Record<string, string> = {
    done: "Выполнен",
    pending: "Готовится",
    created: "Создан",
  };

  const [order, setOrder] = useState<FeedOrder>();
  const ingredients = useAppSelector(selectIngredients);

  const getInfo = async () => {
    const res = await getOrderInfo(number || id!);
    setOrder(res);
  };

  const { orderIngredients }: { orderIngredients: OrderIngredients[] } =
    useMemo(() => {
      const result: any = {};

      order?.ingredients.forEach((id) => {
        if (Object.keys(result).includes(id)) {
          result[id] += 1;
        } else {
          result[id] = 1;
        }
      });

      return {
        orderIngredients: Object.keys(result).map((item) => {
          return {
            ...ingredients.find((element) => element._id === item),
            amount: result[item],
          };
        }),
      };
    }, [order, id]);

  useEffect(() => {
    getInfo();
  }, [id]);

  return (
    <div className={(isModal && styles.modal, styles.root)}>
      <span className={`${styles.number} text text_type_digits-default mb-10`}>
        #{order?.number}
      </span>
      <span className="text text_type_main-default mb-3">{order?.name}</span>
      <span
        className={`${
          order?.status === "done" && "text_color_success"
        } text text_type_main-small mb-15`}
      >
        {order?.status && ordersStatuses[order.status]}
      </span>
      <span className="text text_type_main-default mb-6">Состав:</span>
      <div className={styles.ingredients}>
        {orderIngredients &&
          orderIngredients.map((item) => (
            <OrderIngredient key={item._id} ingredient={item} />
          ))}
      </div>
      <div className={styles.footer}>
        <span className="text text_type_main-default">
          {order?.createdAt && new Date(order.createdAt).toLocaleDateString()}
        </span>
        <div className={styles.price}>
          <span className="text text_type_digits-default">
            {orderIngredients
              ? orderIngredients.reduce((acc, val) => {
                  if (val.price) {
                    return acc + val.price * val.amount;
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
