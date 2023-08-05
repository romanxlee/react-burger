import { type FC } from "react";
import OrderCheckmark from "../order-checkmark/order-checkmark";
import OrderDetailsStyles from "./order-details.module.css";

type Props = {
  orderNumber: number | string;
};

const OrderDetails: FC<Props> = ({ orderNumber }) => {
  return (
    <>
      <span
        className={`${OrderDetailsStyles.number} text text_type_digits-large`}
      >
        {orderNumber}
      </span>
      <span className="text text_type_main-default">идентификатор заказа</span>
      <div className={OrderDetailsStyles.checkmark}>
        <OrderCheckmark />
      </div>
      <div className={OrderDetailsStyles.text}>
        <span className="text text_type_main-small">
          Ваш заказ начали готовить
        </span>
        <span className="text text_type_main-small text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </span>
      </div>
    </>
  );
};

export default OrderDetails;
