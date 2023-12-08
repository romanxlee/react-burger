import { type FC, useMemo } from "react";
import styles from "./order-stats.module.css";
import { FeedOrder } from "../../types";

type Props = {
  orders?: FeedOrder[];
  amountTotal?: number;
  amountToday?: number;
};

export const OrderStats: FC<Props> = ({ orders, amountTotal, amountToday }) => {
  const { doneOrders, inWorkOrders } = useMemo(() => {
    const doneOrders = orders?.filter((order) => order.status === "done");
    const inWorkOrders = orders?.filter((order) => order.status === "pending");

    return {
      doneOrders: doneOrders,
      inWorkOrders: inWorkOrders,
    };
  }, [orders]);
  return (
    <div>
      <div className={styles.ordersStats}>
        <div>
          <span className="text text_type_main-medium">Готовы:</span>
          <ul className={styles.ordersList}>
            {doneOrders &&
              doneOrders.map((order) => (
                <li
                  key={order._id}
                  className={`${styles.orderNumber} text text_type_digits-default`}
                >
                  {order.number}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <span className="text text_type_main-medium">В работе:</span>
          <ul className={styles.ordersList}>
            {inWorkOrders &&
              inWorkOrders.map((order) => (
                <li
                  key={order._id}
                  className={`${styles.orderNumber} text text_type_digits-default`}
                >
                  {order.number}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={styles.amount}>
        <span className="text text_type_main-large">
          Выполнено за все время:
        </span>
        <span className="text text_type_digits-large">{amountTotal}</span>
      </div>
      <div className={styles.amount}>
        <span className="text text_type_main-large">Выполнено за сегодня:</span>
        <span className="text text_type_digits-large">{amountToday}</span>
      </div>
    </div>
  );
};
