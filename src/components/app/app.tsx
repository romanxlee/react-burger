import { useEffect, useState } from "react";

import AppStyles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import type { Ingredient } from "../../types";

function App() {
  const [data, setData] = useState<Ingredient[]>([]);
  const fetchData = () => {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        setData(res.data);
      })
      .catch(console.error);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={AppStyles.app}>
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
