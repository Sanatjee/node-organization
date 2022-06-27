const express = require("express");
const cors = require("cors");
// database connection
require("./config/db");

require("dotenv").config();

const organizationRoutes = require("./routes/organization.routes");

const app = express();

app.use(cors());
app.use(express.json());

// organization's routes

app.use("/api/v1/", organizationRoutes);

app.get("/", async (req, res) => {
  res.send({ message: "server is running" });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});
