import { type FC, useState } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import type { Ingredient } from "../../types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

type Props = {
  ingredients: Ingredient[];
};

const BurgerConstructor: FC<Props> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const BUN = props.ingredients.filter((item) => item.type === "bun")[0];
  const INGREDIENTS = props.ingredients.filter((item) => item.type !== "bun");

  return (
    <div className={BurgerConstructorStyles.container}>
      <div className={BurgerConstructorStyles.item}>
        <div className={BurgerConstructorStyles.blank} />
        <ConstructorElement
          type="top"
          text={`${BUN.name} (верх)`}
          thumbnail={BUN.image}
          price={BUN.price}
          isLocked={true}
        />
      </div>
      <div className={BurgerConstructorStyles.ingredients}>
        {INGREDIENTS.map((item) => (
          <div key={item._id} className={BurgerConstructorStyles.item}>
            <div className={BurgerConstructorStyles.drag}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              text={item.name}
              thumbnail={item.image}
              price={item.price}
            />
          </div>
        ))}
      </div>
      <div className={BurgerConstructorStyles.item}>
        <div className={BurgerConstructorStyles.blank} />
        <ConstructorElement
          type="bottom"
          text={`${BUN.name} (низ)`}
          thumbnail={BUN.image}
          price={BUN.price}
          isLocked={true}
        />
      </div>
      <div className={BurgerConstructorStyles.order}>
        <div className={BurgerConstructorStyles.price}>
          <span className="text text_type_digits-default">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => setModalVisible(true)}
        >
          Оформить заказ
        </Button>
      </div>

      <Modal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        content={<OrderDetails orderNumber="034536" />}
      />
    </div>
  );
};

export default BurgerConstructor;
