import { useEffect, useState } from "react";

import AppStyles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import type { Ingredient } from "../../types";

function App() {
  const [data, setData] = useState<Ingredient[]>([]);
  const fetchData = async () => {
    try {
      await fetch("https://norma.nomoreparties.space/api/ingredients")
        .then((res) => res.json())
        .then((res) => {
          setData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="app" className={AppStyles.app}>
      <AppHeader />
      {data.length > 0 && (
        <main className={AppStyles.main}>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor ingredients={data} />
        </main>
      )}
    </div>
  );
}

export default App;
