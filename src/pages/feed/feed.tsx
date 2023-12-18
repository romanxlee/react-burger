import styles from "./feed.module.css";
import { OrderCard, OrderStats, Modal, OrderInfo } from "../../components";
import { feedOrders } from "../../services/reducers/feed";

import {
  connect as connectFeed,
  disconnect as disconnectFeed,
} from "../../services/actions/feed";
import { useAppDispatch, useAppSelector, useModal } from "../../hooks";
import { useEffect, useState } from "react";
import { FeedOrder } from "../../types";

export const Feed = () => {
  const dispatch = useAppDispatch();
  const feedData = useAppSelector(feedOrders);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [order, setOrder] = useState<FeedOrder>();

  useEffect(() => {
    dispatch(connectFeed("wss://norma.nomoreparties.space/orders/all"));

    return () => {
      dispatch(disconnectFeed());
    };
  }, []);

  const handleClick = (item: FeedOrder) => {
    window.history.pushState(null, "Stellar Burgers", `/#/feed/${item.number}`);
    setOrder(item);
    openModal();
  };

  const handleClose = () => {
    window.history.pushState(null, "Stellar Burgers", `/feed`);
    closeModal();
  };

  return (
    <div className={styles.feed}>
      {feedData ? (
        <div>
          <h1 className="text text_type_main-large">Лента заказов</h1>
          <div className={styles.container}>
            <div className={styles.orders}>
              {feedData &&
                feedData.orders.map((order) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    onClick={() => handleClick(order)}
                  />
                ))}
            </div>
            <OrderStats
              orders={feedData?.orders}
              amountTotal={feedData?.total}
              amountToday={feedData?.totalToday}
            />
          </div>
        </div>
      ) : (
        <span>Загрузка...</span>
      )}
      {isModalOpen && order && (
        <Modal
          onClose={handleClose}
          children={<OrderInfo number={order.number} isModal />}
        />
      )}
    </div>
  );
};
