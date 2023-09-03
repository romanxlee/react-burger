import { type FC } from "react";
import BurgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuid } from 'uuid';

import type { Ingredient } from "../../types";
import { useDrag, useDrop } from "react-dnd";

import { deleteIngredient } from "../../services/slices/ingredientsSlice";
import { useAppDispatch } from "../../hooks";

type Props = {
    ingredient: Ingredient
    moveIngredient: (index: number, overIndex: number) => void;
    index: number
}

const ConstructorItem:FC<Props> = ({ ingredient, moveIngredient, index }) => {
    const type = `constructorItem:${ingredient._id}`;

    const item = uuid();

    const dispatch = useAppDispatch();

    const [, drag] = useDrag({
        type: "ITEM",
        item: { id: item, index },
    });

    const [, drop] = useDrop({
        accept: type,
        canDrop: () => false,
        hover({ index: overIndex }: { index: number }) {
            if (overIndex !== index) {
                moveIngredient(index, overIndex)
            }
        },
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={BurgerConstructorStyles.item}
            style={{ cursor: 'move' }}
        >
            <div className={BurgerConstructorStyles.drag}>
                <DragIcon type="primary"/>
            </div>
            <ConstructorElement
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
                handleClose={() => dispatch(deleteIngredient(ingredient))}
            />
        </div>
    )
}

export default ConstructorItem