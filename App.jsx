import { useEffect, useReducer, useState } from "react";
import Home from "../src/component/Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Product from "../src/component/Product.jsx";
const reducer = (state, action) => {
  switch ((action, type)) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      throw new Error(`Action type is invalid`);
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, 0);
  const handleIncre = () => dispatch({ type: "INCREMENT" });
  const handleDcre = () => dispatch({ type: "DECREMENT" });
  // const [state, setState] = useState(" ");
  // async function fetcData() {
  //   let data = await fetch("http://api.quotable.io/random");
  //   let res = await data.json();
  //   setState(res);
  // }

  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     fetcData();
  //   }, 1000);
  //   return clearInterval(timer);
  // }, []);
  return (
    <>
      <h1>{state}</h1>
      <button
        onClick={() => {
          handleIncre;
        }}
      >
        INCREMENT
      </button>
      <button
        onClick={() => {
          handleDcre;
        }}
      >
        DECREMENT
      </button>
      <Routes>
        {" "}
        <Route path="/Home" element={<Home />} />
      </Routes>

      <Routes>
        {" "}
        <Route path="/Product/:id" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
