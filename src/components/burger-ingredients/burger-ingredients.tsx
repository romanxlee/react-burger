import { useState, type FC } from "react";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import type { Ingredient } from "../../types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const TABS = ["Булки", "Соусы", "Начинки"];

type Props = {
  ingredients: Ingredient[];
};

const BurgerIngredients: FC<Props> = (props) => {
  const [current, setCurrent] = useState("Булки");
  const [choose, setChoose] = useState({} as Ingredient);
  const [modalVisible, setModalVisible] = useState(false);

  const BUNS = props.ingredients.filter((item) => item.type === "bun");
  const SAUCES = props.ingredients.filter((item) => item.type === "sauce");
  const MAINS = props.ingredients.filter((item) => item.type === "main");

  const handleClick = (value: Ingredient) => {
    setModalVisible(true);
    setChoose(value);
  };

  return (
    <div>
      <h3 className="text text_type_main-medium mt-10 mb-5">Соберите бургер</h3>
      <div className={`${BurgerIngredientsStyles.tabs} mb-10`}>
        {TABS.map((tab) => (
          <Tab
            active={current === tab}
            value={tab}
            key={tab}
            onClick={setCurrent}
          >
            {tab}
          </Tab>
        ))}
      </div>
      <div className={BurgerIngredientsStyles.scrollable}>
        <section className={BurgerIngredientsStyles.section}>
          <h4 className="text text_type_main-medium">Булки</h4>
          <div className={BurgerIngredientsStyles.container}>
            {BUNS.map((bun) => (
              <div
                key={bun._id}
                className={BurgerIngredientsStyles.card}
                onClick={() => handleClick(bun)}
              >
                <Counter count={1} size="default" extraClass="m-1" />
                <img
                  src={bun.image}
                  alt={`Изображение ${bun.name}`}
                  className={BurgerIngredientsStyles.cardImage}
                />
                <div className={BurgerIngredientsStyles.price}>
                  <span className="text text_type_digits-default mr-2">
                    {bun.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
                <span
                  key={bun._id}
                  className={`${BurgerIngredientsStyles.name} text text_type_main-small`}
                >
                  {bun.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className={BurgerIngredientsStyles.section}>
          <h4 className="text text_type_main-medium">Соусы</h4>
          <div className={BurgerIngredientsStyles.container}>
            {SAUCES.map((sauce) => (
              <div
                key={sauce._id}
                className={BurgerIngredientsStyles.card}
                onClick={() => handleClick(sauce)}
              >
                <Counter count={1} size="default" extraClass="m-1" />
                <img
                  src={sauce.image}
                  alt={`Изображение ${sauce.name}`}
                  className={BurgerIngredientsStyles.cardImage}
                />
                <div className={BurgerIngredientsStyles.price}>
                  <span className="text text_type_digits-default mr-2">
                    {sauce.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
                <span
                  key={sauce._id}
                  className={`${BurgerIngredientsStyles.name} text text_type_main-small`}
                >
                  {sauce.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className={BurgerIngredientsStyles.section}>
          <h4 className="text text_type_main-medium">Начинки</h4>
          <div className={BurgerIngredientsStyles.container}>
            {MAINS.map((main) => (
              <div
                key={main._id}
                className={BurgerIngredientsStyles.card}
                onClick={() => handleClick(main)}
              >
                <Counter count={1} size="default" extraClass="m-1" />
                <img
                  src={main.image}
                  alt={`Изображение ${main.name}`}
                  className={BurgerIngredientsStyles.cardImage}
                />
                <div className={BurgerIngredientsStyles.price}>
                  <span className="text text_type_digits-default mr-2">
                    {main.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
                <span
                  key={main._id}
                  className={`${BurgerIngredientsStyles.name} text text_type_main-small`}
                >
                  {main.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Modal
        show={modalVisible}
        title="Детали ингредиента"
        onClose={() => setModalVisible(false)}
        content={<IngredientDetails ingredient={choose} />}
      />
    </div>
  );
};

export default BurgerIngredients;
