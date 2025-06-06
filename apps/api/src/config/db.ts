import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Temporarily log the DATABASE_URL to verify it
console.log("Attempting to connect with DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Optional: SSL configuration if connecting to a cloud DB that requires it
    // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL database!');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export = pool;
