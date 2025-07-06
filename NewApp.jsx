import React, { useReducer } from "react";

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return true;
    case "HIDE":
      return false;
    default:
      throw new Error(`Action type is invalid: ${action.type}`);
  }
};

function NewApp() {
  const [state, dispatch] = useReducer(reducer, false);

  return (
    <div>
      {state && <p>Hello, this is a message!</p>}
      <button onClick={() => dispatch({ type: "SHOW" })}>Show</button>
      <button onClick={() => dispatch({ type: "HIDE" })}>Hide</button>
    </div>
  );
}

export default NewApp;
