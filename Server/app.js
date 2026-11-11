const express = require("express");
const cors = require("cors");
const { pool } = require('./config/db');
const app = express();
const authRoutes = require('./routes/auth.routes');
const readingRoutes = require('./routes/readingRoutes');

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
app.use('/api/readings', readingRoutes);

module.exports = app;