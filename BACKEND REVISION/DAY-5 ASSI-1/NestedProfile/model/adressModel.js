// models/address.schema.js (just a schema, not a model)
const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  street: {
    type: String,
    required: [true, "Street is required"]
  },
  city: {
    type: String,
    required: [true, "City is required"]
  },
  state: {
    type: String,
    required: [true, "State is required"]
  },
  country: {
    type: String,
    default: "India"
  },
  pincode: {
    type: String,
    required: [true, "Pincode is required"],
    validate: {
      validator: function (v) {
        return /^[1-9][0-9]{5}$/.test(v); // Indian 6-digit pincode
      },
      message: (props) => `${props.value} is not a valid pincode`
    }
  }
});

module.exports = addressSchema;
