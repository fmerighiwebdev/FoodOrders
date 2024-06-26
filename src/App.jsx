import React from "react";

import Header from "./components/Header";
import MealsMenu from "./components/MealsMenu";
import { CartContextProvider } from "./context/CartContext";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <MealsMenu />
    </CartContextProvider>
  );
}

export default App;
