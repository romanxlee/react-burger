import styles from "./feed.module.css";
import { OrderCard, OrderStats } from "../../components";
import { feedOrders } from "../../services/reducers/feed";

import {
  connect as connectFeed,
  disconnect as disconnectFeed,
} from "../../services/actions/feed";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";

export const Feed = () => {
  const dispatch = useAppDispatch();
  const feedData = useAppSelector(feedOrders);

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
            {feedData &&
              feedData.orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
          </div>
          <OrderStats
            orders={feedData?.orders}
            amountTotal={feedData?.total}
            amountToday={feedData?.totalToday}
          />
        </div>
      </div>
    </div>
  );
};
