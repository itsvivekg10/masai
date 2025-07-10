// import { useEffect, useReducer, useState } from "react";
import Home from "../src/component/Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Product from "../src/component/Product.jsx";
import NavBar from "./component/NavBar.jsx";
import Cart from "./component/Cart.jsx";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {" "}
        <Route path="/Home" element={<Home />} />
      </Routes>

      <Routes>
        {" "}
        <Route path="/Product/:id" element={<Product />} />
      </Routes>
      <Routes>
        <Route path="cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
