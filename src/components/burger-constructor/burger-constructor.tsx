import data from "../../utils/data";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from './burger-constructor.module.css';

const BurgerConstructor = () => {
    return (
        <div className={BurgerConstructorStyles.container}>
            {data.map((item, index) => (
                <ConstructorElement key={item._id} type={index === 0 ? 'top' : index === data.length - 1 ? 'bottom' : undefined} text={item.name} thumbnail={item.image} price={item.price} />
            ))}
            <div className={BurgerConstructorStyles.order}>
                <div className={BurgerConstructorStyles.price}>
                    <span className="text text_type_digits-default">610</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

export default BurgerConstructor;