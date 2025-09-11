const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  profileName: {
    type: String,
    enum: ["fb", "twitter", "github", "instagram"],
    required: [true, "Profile name is required"]
  },
  url: {
    type: String,
    required: [true, "Profile URL is required"],
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)[\w.-]+\.[\w]{2,}(\/\S*)?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`
    }
  }
});

const userSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  profiles: [profileSchema]
});

module.exports = mongoose.model("User", userSchema);
