// index.js
const express = require("express");
const apiRoutes = require("./routes/api");

const app = express();

app.use(express.json());

app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
