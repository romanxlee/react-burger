import { useEffect } from "react";

import AppStyles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { useAppSelector, useAppDispatch } from "../../hooks";

import { fetchIngredientsAsync, selectIngredients, chosenIngredients } from "../../services/slices/ingredientsSlice";

function App() {
    const dispatch = useAppDispatch();

    const ingredients = useAppSelector(selectIngredients);
    const constructorIngredients = useAppSelector(chosenIngredients)
    const status = useAppSelector((state) => state.ingredients.status);
    const error = useAppSelector((state) => state.ingredients.error);

    useEffect(() => {
        dispatch(fetchIngredientsAsync());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>
    } else if (status === 'failed') {
        return <div>Error: {error}</div>
    }

  return (
    <div className={AppStyles.app}>
      <AppHeader />
        {ingredients.length && (
            <main className={AppStyles.main}>
                <BurgerIngredients ingredients={ingredients}/>
                <BurgerConstructor ingredients={ingredients}/>
            </main>
        )}
    </div>
  );
}

export default App;
