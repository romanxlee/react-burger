import { OrderCheckmark } from "../order-checkmark/order-checkmark";
import OrderDetailsStyles from "./order-details.module.css";

import { useAppSelector } from "../../hooks";
import { orderDetail } from "../../services/slices/orderSlice";

export const OrderDetails = () => {
  const order = useAppSelector(orderDetail);

  return (
    <>
      <span
        className={`${OrderDetailsStyles.number} text text_type_digits-large`}
      >
        {order?.order.number}
      </span>
      <span className="text text_type_main-default">идентификатор заказа</span>
      <div className={OrderDetailsStyles.checkmark}>
        <OrderCheckmark />
      </div>
      <div className={OrderDetailsStyles.text}>
        <span className="text text_type_main-small">
          {`Ваш заказ ${order?.name} начали готовить`}
        </span>
        <span className="text text_type_main-small text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </span>
      </div>
    </>
  );
};
