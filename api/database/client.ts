import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'rekadigi',
    password: process.env.DB_PASSWORD || '',
    port: Number(process.env.DB_PORT) || 5432
});

export default db;