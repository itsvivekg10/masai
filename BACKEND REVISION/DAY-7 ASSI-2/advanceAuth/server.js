require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const subscriptionRoutes = require("./routes/subscription");
const contentRoutes = require("./routes/content");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log("Mongo connected"))
  .catch(err => { console.error(err); process.exit(1); });

app.use("/auth", authRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/content", contentRoutes);

// optional health
app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Listening ${PORT}`));
