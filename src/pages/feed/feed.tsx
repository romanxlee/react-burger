import styles from "./feed.module.css";
import { OrderCard } from "../../components";
import { feedOrders } from "../../services/reducers/feed";

import {
  connect as connectFeed,
  disconnect as disconnectFeed,
} from "../../services/actions/feed";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";

export const Feed = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(feedOrders)?.orders;

  useEffect(() => {
    dispatch(connectFeed("ws://norma.nomoreparties.space/orders/all"));

    return () => {
      dispatch(disconnectFeed());
    };
  }, []);

  return (
    <div className={styles.feed}>
      <div>
        <h1 className="text text_type_main-large">Лента заказов</h1>
        <div className={styles.container}>
          <div className={styles.orders}>
            {orders &&
              orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
