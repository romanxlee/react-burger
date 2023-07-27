import React from 'react';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

function App() {
  return (
    <div className="App">
      <AppHeader />
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
            <BurgerIngredients />
            <BurgerConstructor />
        </div>
    </div>
  );
}

export default App;
