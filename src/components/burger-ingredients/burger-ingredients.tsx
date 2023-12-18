import { useState, useEffect, useRef } from "react";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import type { Ingredient } from "../../types";
import { Modal, IngredientDetails, IngredientCard } from "../../components";
import { useModal, useAppDispatch, useAppSelector } from "../../hooks";

import {
  selectIngredients,
  setCurrentIngredient,
  unsetCurrentIngredient,
} from "../../services/slices/ingredientsSlice";

const TABS = ["Булки", "Соусы", "Начинки"];

export const BurgerIngredients = () => {
  const [current, setCurrent] = useState("Булки");

  const { isModalOpen, openModal, closeModal } = useModal();

  const ingredients = useAppSelector(selectIngredients);

  const BUNS = ingredients.filter((item) => item.type === "bun");
  const SAUCES = ingredients.filter((item) => item.type === "sauce");
  const MAINS = ingredients.filter((item) => item.type === "main");

  const dispatch = useAppDispatch();

  const handleClick = (value: Ingredient) => {
    window.history.pushState(
      null,
      "Stellar Burgers",
      `#/ingredients/${value._id}`,
    );
    openModal();
    dispatch(setCurrentIngredient(value));
  };

  const handleClose = () => {
    window.history.pushState(null, "Stellar Burgers", `/`);
    dispatch(unsetCurrentIngredient());
    closeModal();
  };

  const handleScroll = () => {
    const ingredientSections = document.querySelectorAll("section");
    let closestIndex = -1;
    let closestDistance = Infinity;
    ingredientSections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const distance = rect.top * rect.top + rect.left * rect.left;
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrent(TABS[closestIndex]);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
  }, []);

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
      <div ref={containerRef} className={BurgerIngredientsStyles.scrollable}>
        <section className={BurgerIngredientsStyles.section}>
          <h4 className="text text_type_main-medium">Булки</h4>
          <div className={BurgerIngredientsStyles.container}>
            {BUNS.map((bun, index) => (
              <IngredientCard
                key={bun._id}
                ingredient={bun}
                onCLick={() => handleClick(bun)}
                testId={`bun-${index}`}
              />
            ))}
          </div>
        </section>

        <section className={BurgerIngredientsStyles.section}>
          <h4 className="text text_type_main-medium">Соусы</h4>
          <div className={BurgerIngredientsStyles.container}>
            {SAUCES.map((sauce, index) => (
              <IngredientCard
                key={sauce._id}
                ingredient={sauce}
                onCLick={() => handleClick(sauce)}
                testId={`sauce-${index}`}
              />
            ))}
          </div>
        </section>

        <section className={BurgerIngredientsStyles.section}>
          <h4 className="text text_type_main-medium">Начинки</h4>
          <div className={BurgerIngredientsStyles.container}>
            {MAINS.map((main, index) => (
              <IngredientCard
                key={main._id}
                ingredient={main}
                onCLick={() => handleClick(main)}
                testId={`main-${index}`}
              />
            ))}
          </div>
        </section>
      </div>
      {isModalOpen && (
        <Modal
          title="Детали ингредиента"
          onClose={handleClose}
          children={<IngredientDetails />}
        />
      )}
    </div>
  );
};
