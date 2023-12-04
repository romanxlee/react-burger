import { useEffect } from "react";
import { OrderCard } from "../order-card/order-card";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  connect as profileConnect,
  disconnect as profileDisconnect,
} from "../../services/actions/profile-orders";
import { getCookie } from "../../utils/cookie";
import { profileOrders } from "../../services/reducers/profileOrders";

export const ProfileOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(profileOrders);
  const token = getCookie("access")?.split("Bearer ")[1];

  useEffect(() => {
    dispatch(
      profileConnect(`wss://norma.nomoreparties.space/orders?token=${token}`),
    );

    return () => {
      dispatch(profileDisconnect());
    };
  }, []);

  return (
    <div>
      {orders &&
        orders.orders.map((order) => (
          <OrderCard key={order._id} order={order} isProfile />
        ))}
    </div>
  );
};
