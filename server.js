const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
// database connection
require("./config/db");

require("dotenv").config();

const organizationRoutes = require("./routes/organization.routes");
const userRoutes = require("./routes/users.routes");
const leaveTypesRoutes = require("./routes/leaveType.routes");
const leavesRoutes = require("./routes/leaves.routes")

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// organization's routes

app.use("/api/v1/", organizationRoutes);
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", leaveTypesRoutes);
app.use("/api/v1/", leavesRoutes);

app.get("/", async (req, res) => {
  res.send({ message: "server is running" });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});
