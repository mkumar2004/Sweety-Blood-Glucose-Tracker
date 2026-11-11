const express = require("express");
const cors = require("cors");
const { pool } = require('./config/db');
const app = express();


app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(express.json());

// api


module.exports = app;