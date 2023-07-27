import { useState } from "react";
import BurgerIngredientsStyles from "./burger-ingredients.module.css"
import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import data from "../../utils/data";

const TABS = ["Булки", "Соусы", "Начинки"]

const BUNS = data.filter(item => item.type === 'bun')
const SAUCES = data.filter(item => item.type === 'sauce')
const MAINS = data.filter(item => item.type === 'main')

const BurgerIngredients = () => {

    const [current, setCurrent] = useState("Булки")

    return (
        <div>
            <h3 className="text text_type_main-medium">Соберите бургер</h3>
            <div className={BurgerIngredientsStyles.tabs}>
                {
                    TABS.map((tab) => (
                        <Tab active={current === tab} value={tab} key={tab} onClick={setCurrent}>
                            {tab}
                        </Tab>
                ))}
            </div>
            <div className={BurgerIngredientsStyles.scrollable}>
                <section className={BurgerIngredientsStyles.section}>
                    <h4 className="text text_type_main-medium">Булки</h4>
                    <div className={BurgerIngredientsStyles.container}>
                        {
                            BUNS.map(bun => (
                                <div key={bun._id} className={BurgerIngredientsStyles.card}>
                                    <Counter count={1} size="default" extraClass="m-1"/>
                                    <img src={bun.image} alt="Картинка ингридиента"
                                         className={BurgerIngredientsStyles.cardImage}/>
                                    <div className={BurgerIngredientsStyles.price}>
                                        <span className="text text_type_digits-default mr-2">{bun.price}</span>
                                        <CurrencyIcon type="primary"/>
                                    </div>
                                    <span key={bun._id}
                                          className={`${BurgerIngredientsStyles.name} text text_type_main-small`}>{bun.name}</span>
                                </div>

                            ))
                        }
                    </div>
                </section>

                <section className={BurgerIngredientsStyles.section}>
                    <h4 className="text text_type_main-medium">Соусы</h4>
                    <div className={BurgerIngredientsStyles.container}>
                        {
                            SAUCES.map(sauce => (
                                <div key={sauce._id} className={BurgerIngredientsStyles.card}>
                                    <Counter count={1} size="default" extraClass="m-1"/>
                                    <img src={sauce.image} alt="Картинка ингридиента"
                                         className={BurgerIngredientsStyles.cardImage}/>
                                    <div className={BurgerIngredientsStyles.price}>
                                        <span className="text text_type_digits-default mr-2">{sauce.price}</span>
                                        <CurrencyIcon type="primary"/>
                                    </div>
                                    <span key={sauce._id}
                                          className={`${BurgerIngredientsStyles.name} text text_type_main-small`}>{sauce.name}</span>
                                </div>

                            ))
                        }
                    </div>
                </section>

                <section className={BurgerIngredientsStyles.section}>
                    <h4 className="text text_type_main-medium">Начинки</h4>
                    <div className={BurgerIngredientsStyles.container}>
                        {
                            MAINS.map(main => (
                                <div key={main._id} className={BurgerIngredientsStyles.card}>
                                    <Counter count={1} size="default" extraClass="m-1"/>
                                    <img src={main.image} alt="Картинка ингридиента"
                                         className={BurgerIngredientsStyles.cardImage}/>
                                    <div className={BurgerIngredientsStyles.price}>
                                        <span className="text text_type_digits-default mr-2">{main.price}</span>
                                        <CurrencyIcon type="primary"/>
                                    </div>
                                    <span key={main._id}
                                          className={`${BurgerIngredientsStyles.name} text text_type_main-small`}>{main.name}</span>
                                </div>

                            ))
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default BurgerIngredients