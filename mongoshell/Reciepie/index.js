const express = require("express");
const bodyParser = require("body-parser");
// const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/reciepie", reciepieRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
