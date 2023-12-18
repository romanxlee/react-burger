import { useEffect, useState } from "react";
import { OrderCard } from "../order-card/order-card";
import { useAppDispatch, useAppSelector, useModal } from "../../hooks";
import {
  connect as profileConnect,
  disconnect as profileDisconnect,
} from "../../services/actions/profile-orders";
import { getCookie } from "../../utils/cookie";
import { profileOrders } from "../../services/reducers/profileOrders";
import { FeedOrder } from "../../types";
import { Modal } from "../modal/modal";
import { OrderInfo } from "../order-info/order-info";
import styles from "./profile-orders.module.css";

export const ProfileOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(profileOrders);
  const token = getCookie("access")?.split("Bearer ")[1];
  const { isModalOpen, openModal, closeModal } = useModal();
  const [order, setOrder] = useState<FeedOrder>();

  const handleClick = (item: FeedOrder) => {
    window.history.pushState(
      null,
      "Stellar Burgers",
      `#/profile/orders/${item.number}`,
    );
    setOrder(item);
    openModal();
  };

  const handleClose = () => {
    window.history.pushState(null, "Stellar Burgers", `#/profile/orders`);
    closeModal();
  };

  useEffect(() => {
    dispatch(
      profileConnect(`wss://norma.nomoreparties.space/orders?token=${token}`),
    );

    return () => {
      dispatch(profileDisconnect());
    };
  }, []);

  return (
    <div className={styles.root}>
      {orders &&
        orders.orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            isProfile
            onClick={() => handleClick(order)}
          />
        ))}
      {isModalOpen && order && (
        <Modal
          onClose={handleClose}
          children={<OrderInfo number={order.number} isModal />}
        />
      )}
    </div>
  );
};
