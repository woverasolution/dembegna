// apps/api/src/index.ts
import express from 'express';
import pool = require('./config/db'); // Changed to import = require()
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
// import { DembegnaUser } from '@dembegna/shared-types'; // Will work after linking

import authRoutes from './modules/auth/auth.routes'; // Import auth routes
import customerRoutes from './modules/customers/customers.routes'; // Import customer routes

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
const customerFrontendUrl = process.env.CUSTOMER_FRONTEND_URL || 'http://localhost:3000';
const corsOptions = {
  origin: customerFrontendUrl,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/api/health', (req, res) => {
  res.json({ status: 'Dembegna API is healthy and running!' });
});

// Register auth routes
app.use('/api/v1/auth', authRoutes);

// Register customer routes
app.use('/api/v1/customers', customerRoutes);

// New route for DB test
app.get('/api/db-test', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
    client.release();
  } catch (err) {
    console.error('Error connecting to DB or querying', err);
    res.status(500).json({ success: false, error: 'DB connection error' });
  }
});

export default app;