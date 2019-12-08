import React from "react";
import "./App.css";
import Customers from "./components/customers";
import Products from "./components/products";
import Stores from "./components/stores";

function App() {
  return (
    <div className="App">
      <Customers />
      <br />
      <Products />
      <br />
      <Stores />
    </div>
  );
}

export default App;
