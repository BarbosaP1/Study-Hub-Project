const express = require("express");
const path = require("path");

const apiRoutes = require("./routes/api");
const pageRoutes = require("./routes/pages");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRoutes);
app.use("/", pageRoutes);

module.exports = app;