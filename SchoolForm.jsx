import React, { useReducer } from "react";

// Reducer function to manage form state
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      throw new Error("Invalid action type");
  }
};

function SchoolForm() {
  const initialState = {
    collegeName: "",
    year: "",
    address: "",
    course: "",
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <div>
      <h1>COLLEGE FORM</h1>

      <label>College Name:</label>
      <input
        name="collegeName"
        value={formState.collegeName}
        onChange={handleChange}
      />

      <label>Establishment Year:</label>
      <input name="year" value={formState.year} onChange={handleChange} />

      <label>Address:</label>
      <input name="address" value={formState.address} onChange={handleChange} />

      <label>Courses:</label>
      <input name="course" value={formState.course} onChange={handleChange} />

      <pre>{JSON.stringify(formState, null, 2)}</pre>
    </div>
  );
}

export default SchoolForm;
