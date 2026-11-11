const express = require("express");
const cors = require("cors");
const { pool } = require('./config/db');
const app = express();
const authRoutes = require('./routes/auth.routes');

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(express.json());

// api

// Authentication routes
app.use('/api/auth', authRoutes);


module.exports = app;