import React from "react";
import "./App.css";
import Customers from "./components/customers";
import Products from "./components/products";

function App() {
  return (
    <div className="App">
      <h3>Customer</h3>
      <Customers />
      <Products />
    </div>
  );
}

export default App;
