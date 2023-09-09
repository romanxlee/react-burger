import { useState, type FC, useEffect, useRef } from "react";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import type { Ingredient } from "../../types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientCard from "../ingredient/ingredient";
import { useModal } from "../../hooks";

const TABS = ["Булки", "Соусы", "Начинки"];

type Props = {
  ingredients: Ingredient[];
};

const BurgerIngredients: FC<Props> = (props) => {
  const [current, setCurrent] = useState("Булки");
  const [choose, setChoose] = useState({} as Ingredient);

  const { isModalOpen, openModal, closeModal } = useModal();

  const BUNS = props.ingredients.filter((item) => item.type === "bun");
  const SAUCES = props.ingredients.filter((item) => item.type === "sauce");
  const MAINS = props.ingredients.filter((item) => item.type === "main");

  const handleClick = (value: Ingredient) => {
    openModal();
    setChoose(value);
  };

  const handleScroll = () => {
    const ingredientSections = document.querySelectorAll('section');
    let closestIndex = -1;
    let closestDistance = Infinity;
    ingredientSections.forEach((section, index) => {
      const rect = section.getBoundingClientRect()
      const distance = ((rect.top) * (rect.top) + rect.left * rect.left);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    })

    setCurrent(TABS[closestIndex]);
  }

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }
  }, [])

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
            {BUNS.map((bun) => (
                <IngredientCard key={bun._id} ingredient={bun} onCLick={() => handleClick(bun)} />
            ))}
          </div>
        </section>

        <section className={BurgerIngredientsStyles.section}>
          <h4 className="text text_type_main-medium">Соусы</h4>
          <div className={BurgerIngredientsStyles.container}>
            {SAUCES.map((sauce) => (
                <IngredientCard key={sauce._id} ingredient={sauce} onCLick={() => handleClick(sauce)} />
            ))}
          </div>
        </section>

        <section className={BurgerIngredientsStyles.section}>
          <h4 className="text text_type_main-medium">Начинки</h4>
          <div className={BurgerIngredientsStyles.container}>
            {MAINS.map((main) => (
                <IngredientCard key={main._id} ingredient={main} onCLick={() => handleClick(main)} />
            ))}
          </div>
        </section>
      </div>
      {isModalOpen && (
        <Modal
          title="Детали ингредиента"
          onClose={closeModal}
          children={<IngredientDetails ingredient={choose} />}
        />
      )}
    </div>
  );
};

export default BurgerIngredients;
