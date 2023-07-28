import AppStyles from './app.module.css'

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
    return (
        <div className="App">
            <AppHeader />
            <main className={AppStyles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </div>
    );
}

export default App;
