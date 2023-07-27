import React from 'react';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";

function App() {
  return (
    <div className="App">
      <AppHeader />
        <div>
            <BurgerIngredients />
        </div>
    </div>
  );
}

export default App;
