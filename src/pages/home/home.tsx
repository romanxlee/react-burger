import HomeStyles from "./home.module.css";

import { BurgerIngredients, BurgerConstructor } from "../../components";

import { useAppSelector } from "../../hooks";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const Home = () => {
  const status = useAppSelector((state) => state.ingredients.status);
  const error = useAppSelector((state) => state.ingredients.error);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <main className={HomeStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
};
