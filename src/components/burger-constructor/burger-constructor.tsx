import { useMemo } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import type { Ingredient } from "../../types";
import { ConstructorItem, Modal, OrderDetails } from "../../components";
import { useAppDispatch, useAppSelector, useModal } from "../../hooks";
import { useNavigate } from "react-router-dom";

import { useDrop } from "react-dnd";

import {
  keepIngredient,
  keepBun,
  chosenIngredients,
  chosenBun,
} from "../../services/slices/ingredientsSlice";
import { fetchOrder } from "../../services/slices/orderSlice";

import { v4 as uuid } from "uuid";
import { currentUser } from "../../services/slices/authSlice";

export const BurgerConstructor = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const bun = useAppSelector(chosenBun);
  const mainIngredients = useAppSelector(chosenIngredients);
  const user = useAppSelector(currentUser);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [, drop] = useDrop({
    accept: "ingredient",
    drop(item: Ingredient) {
      item.type === "bun"
        ? dispatch(keepBun({ ...item, id: uuid() }))
        : dispatch(keepIngredient({ ...item, id: uuid() }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const totalSum = useMemo(() => {
    let sum = 0;

    if (bun) sum += bun.price * 2;

    if (mainIngredients.length) {
      mainIngredients.forEach((ingredient) => (sum += ingredient.price));
    }

    return sum;
  }, [bun, mainIngredients]);

  const ingredientsId = useMemo(() => {
    let ids: string[] = [];

    if (bun) ids.push(bun._id);

    if (mainIngredients.length) {
      const mainIds = mainIngredients.map((item) => {
        return item._id;
      });

      ids = [...mainIds, ...ids];
    }

    return ids;
  }, [bun, mainIngredients]);

  const sendOrder = async () => {
    if (!user) return navigate("/login");
    openModal();
    dispatch(fetchOrder(ingredientsId));
  };

  return (
    <div className={BurgerConstructorStyles.container} ref={drop}>
      {bun && (
        <div className={BurgerConstructorStyles.item}>
          <div className={BurgerConstructorStyles.blank} />
          <ConstructorElement
            type="top"
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
            price={bun.price}
            isLocked={true}
          />
        </div>
      )}
      <div className={BurgerConstructorStyles.ingredients}>
        {mainIngredients.map((item, index) => (
          <ConstructorItem key={item.id} ingredient={item} index={index} />
        ))}
      </div>
      {bun && (
        <div className={BurgerConstructorStyles.item}>
          <div className={BurgerConstructorStyles.blank} />
          <ConstructorElement
            type="bottom"
            text={`${bun.name} (низ)`}
            thumbnail={bun.image}
            price={bun.price}
            isLocked={true}
          />
        </div>
      )}
      <div className={BurgerConstructorStyles.order}>
        <div className={BurgerConstructorStyles.price}>
          <span className="text text_type_digits-default">{totalSum}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={sendOrder}
        >
          Оформить заказ
        </Button>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal} children={<OrderDetails />} />
      )}
    </div>
  );
};
