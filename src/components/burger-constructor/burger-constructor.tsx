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
import { useAppDispatch, useModal } from "../../hooks";
import ConstructorItem from "../constructor-item/constructor-item";

import { useDrop } from 'react-dnd'

import { keepIngredient } from "../../services/slices/ingredientsSlice";

import { v4 as uuid } from 'uuid';

type Props = {
  ingredients: Ingredient[];
};

const BurgerConstructor: FC<Props> = (props) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const BUN = props.ingredients.filter((item) => item.type === "bun")[0];
  const INGREDIENTS = props.ingredients.filter((item) => item.type !== "bun");

  const dispatch = useAppDispatch();

    const [{ isOver }, drop] = useDrop({
        accept: 'ingredient',
        drop(item) {
            dispatch(keepIngredient({...item as Ingredient, id: uuid()}))
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })

    const moveIngredient = useCallback((fromIndex: number, toIndex: number) => {
        const newIngredients = [...INGREDIENTS];
        const itemMoving = newIngredients[fromIndex];

        newIngredients.splice(fromIndex, 1);
        newIngredients.splice(toIndex, 0, itemMoving);

        // setIngredients(newIngredients);
    }, [props.ingredients, INGREDIENTS]);

  return (
    <div className={BurgerConstructorStyles.container}
         ref={drop}
         style={{
             backgroundColor: isOver ? 'yellow' : '',
         }}>
        {props.ingredients.length && <div>
            <div className={BurgerConstructorStyles.item}>
                <div className={BurgerConstructorStyles.blank}/>
                <ConstructorElement
                    type="top"
                    text={`${BUN.name} (верх)`}
                    thumbnail={BUN.image}
                    price={BUN.price}
                    isLocked={true}
                />
            </div>
            <div className={BurgerConstructorStyles.ingredients}>
                {INGREDIENTS.map((item, index) => (
                    <ConstructorItem key={item.id} ingredient={item} index={index} moveIngredient={moveIngredient} />
                ))}
            </div>
            <div className={BurgerConstructorStyles.item}>
                <div className={BurgerConstructorStyles.blank}/>
                <ConstructorElement
                    type="bottom"
                    text={`${BUN.name} (низ)`}
                    thumbnail={BUN.image}
                    price={BUN.price}
                    isLocked={true}
                />
            </div>
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
