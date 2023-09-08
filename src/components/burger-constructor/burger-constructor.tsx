import { type FC, useCallback } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import type { Ingredient } from "../../types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useAppDispatch, useAppSelector, useModal} from "../../hooks";
import ConstructorItem from "../constructor-item/constructor-item";

import { useDrop } from 'react-dnd'

import {keepIngredient, keepBun, chosenIngredients, chosenBun } from "../../services/slices/ingredientsSlice";

import { v4 as uuid } from 'uuid';

const BurgerConstructor = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const bun = useAppSelector(chosenBun)
  const mainIngredients = useAppSelector(chosenIngredients)

  const dispatch = useAppDispatch();

    const [, drop] = useDrop({
        accept: 'ingredient',
        drop(item: Ingredient) {
            item.type === "bun" ? dispatch(keepBun({...item, id: uuid()})) : dispatch(keepIngredient({...item, id: uuid()}))
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })

  return (
    <div className={BurgerConstructorStyles.container} ref={drop}>
            {bun && <div className={BurgerConstructorStyles.item}>
                <div className={BurgerConstructorStyles.blank}/>
                <ConstructorElement
                    type="top"
                    text={`${bun.name} (верх)`}
                    thumbnail={bun.image}
                    price={bun.price}
                    isLocked={true}
                />
            </div>}
            <div className={BurgerConstructorStyles.ingredients}>
                {mainIngredients.map((item, index) => (
                    <ConstructorItem key={item.id} ingredient={item} index={index} />
                ))}
            </div>
            {bun && <div className={BurgerConstructorStyles.item}>
                <div className={BurgerConstructorStyles.blank}/>
                <ConstructorElement
                    type="bottom"
                    text={`${bun.name} (низ)`}
                    thumbnail={bun.image}
                    price={bun.price}
                    isLocked={true}
                />
            </div>}
      <div className={BurgerConstructorStyles.order}>
        <div className={BurgerConstructorStyles.price}>
          <span className="text text_type_digits-default">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          children={<OrderDetails orderNumber="034536" />}
        />
      )}
    </div>
  );
};

export default BurgerConstructor;
