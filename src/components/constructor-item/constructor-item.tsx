import { type FC, useRef } from "react";
import BurgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import type { Ingredient } from "../../types";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier } from 'dnd-core'

import { deleteIngredient, reorderIngredient } from "../../services/slices/ingredientsSlice";
import { useAppDispatch } from "../../hooks";

type Props = {
    ingredient: Ingredient
    index: number
}

type DragItem = {
    index: number
    id: string
    type: string
}

const ConstructorItem:FC<Props> = ({ ingredient, index }) => {

    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: ["constructor-ingredient"],
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            };
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch(reorderIngredient({ from: dragIndex, to: hoverIndex }));

            item.index = hoverIndex;
        }
    });
    const [{ isDragging }, drag] = useDrag({
        type: "constructor-ingredient",
        item: () => {
            return { ingredient, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            className={BurgerConstructorStyles.item}
            style={{ cursor: 'move', opacity: isDragging ? 0.5 : 1 }}
            data-handler-id={handlerId}
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