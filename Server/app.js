const express = require("express");
const cors = require("cors");
const { pool } = require('./config/db');
const app = express();
const authRoutes = require('./routes/auth.routes');
const readingRoutes = require('./routes/readingRoutes');
const reportRoutes = require('./routes/reportRoutes');

// CORS configuration
const allowedOrigins = process.env.Front_End_url
  ? [process.env.Front_End_url, process.env.Front_End_url.replace(/\/$/, '')]
  : '*';

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins === '*' || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for production deployment
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Root / Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Sweety Blood Glucose Tracker API is running',
    timestamp: new Date().toISOString(),
  });
});

// api
app.use('/api/auth', authRoutes);
app.use('/api/readings', readingRoutes);
app.use('/api/reports', reportRoutes);


module.exports = app;