import { useEffect } from "react";

import AppStyles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { useAppSelector, useAppDispatch } from "../../hooks";

import { fetchIngredientsAsync, selectIngredients, chosenIngredients } from "../../services/slices/ingredientsSlice";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
            <main className={AppStyles.main}>
                <DndProvider backend={HTML5Backend}>
                    {ingredients.length && <BurgerIngredients ingredients={ingredients}/>}
                    <BurgerConstructor ingredients={constructorIngredients}/>
                </DndProvider>
            </main>
    </div>
  );
}

export default App;
