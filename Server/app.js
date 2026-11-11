const express = require("express");
const cors = require("cors");
const { pool } = require('./config/db');
const app = express();
const authRoutes = require('./routes/auth.routes');
const readingRoutes = require('./routes/readingRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use(
  cors({
    origin: process.env.Front_End_url,
    credentials: true,
  })
);

app.use(express.json());

// api
app.use('/api/auth', authRoutes);
app.use('/api/readings', readingRoutes);
app.use('/api/reports', reportRoutes);


module.exports = app;