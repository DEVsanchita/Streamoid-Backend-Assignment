import pkg from 'pg';
const { Pool } = pkg;


let pool;


export async function initDB() {
pool = new Pool({
user: 'postgres', // change if needed
host: 'localhost',
database: 'streamoid',
password: 'Sanchita@25',
port: 5432,
});


try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                sku TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                brand TEXT NOT NULL,
                color TEXT,
                size TEXT,
                mrp REAL NOT NULL,
                price REAL NOT NULL,
                quantity INTEGER NOT NULL
            )
        `);
        console.log('✅ Products table ready');
    } catch (err) {
        console.error('❌ Error creating table', err);
        process.exit(1);
    }
}


export function getDB() {
if (!pool) throw new Error('Database not initialized');
    return pool;
}