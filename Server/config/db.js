
const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// Use Supabase in production, Docker PostgreSQL in development
const connectionString = (isProduction ? process.env.DATABASE_URL : (process.env.DEV_DATABASE_URL || process.env.DATABASE_URL))?.trim();

const pool = new Pool({
    connectionString,
    connectionTimeoutMillis: 5000,
    // Supabase requires SSL, local Docker PostgreSQL does not
    ssl: isProduction ? { rejectUnauthorized: false } : false,
    max: isProduction ? 10 : 10,
});

pool.on('error', (err) => {
    console.error('Unexpected PostgreSQL error on idle client:', err.message);
});

const connectDB = async () => {
    let client;
    try {
        console.log(`🔌 Connecting to PostgreSQL [${isProduction ? 'Production / Supabase' : 'Development / Docker'}]...`);
        client = await pool.connect();
        const res = await client.query('SELECT NOW()');
        console.log(
            `✅ PostgreSQL Connected successfully (${isProduction ? 'Supabase' : 'Docker'} | DB Time: ${res.rows[0].now})`
        );
    } catch (error) {
        const errorMsg = error.errors?.map(e => e.message).join(', ') || error.message || error;
        console.error(`❌ PostgreSQL Connection Error (${isProduction ? 'Supabase' : 'Docker'}):`, errorMsg);
        process.exit(1);
    } finally {
        if (client) client.release();
    }
};

module.exports = { pool, connectDB };
