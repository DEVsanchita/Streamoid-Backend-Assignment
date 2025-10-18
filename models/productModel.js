import { getDB } from '../db.js';


export const insertProduct = async (product) => {
const pool = getDB();
const query = `
INSERT INTO products (sku, name, brand, color, size, mrp, price, quantity)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
ON CONFLICT (sku) DO UPDATE SET
name = EXCLUDED.name,
brand = EXCLUDED.brand,
color = EXCLUDED.color,
size = EXCLUDED.size,
mrp = EXCLUDED.mrp,
price = EXCLUDED.price,
quantity = EXCLUDED.quantity;
`;
const values = [product.sku, product.name, product.brand, product.color, product.size, product.mrp, product.price, product.quantity];
await pool.query(query, values);
};


export const getAllProducts = async (offset, limit) => {
const pool = getDB();
const result = await pool.query('SELECT * FROM products LIMIT $1 OFFSET $2', [limit, offset]);
return result.rows;
};


export const countProducts = async () => {
const pool = getDB();
const result = await pool.query('SELECT COUNT(*) as count FROM products');
return parseInt(result.rows[0].count);
};


export const searchProducts = async (filters) => {
  const pool = getDB();
  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (filters.brand) {
    params.push(filters.brand);
    query += ` AND brand = $${params.length}`;
  }
  if (filters.color) {
    params.push(filters.color);
    query += ` AND color = $${params.length}`;
  }
  if (filters.minPrice) {
    params.push(Number(filters.minPrice));
    query += ` AND price >= $${params.length}`;
  }
  if (filters.maxPrice) {
    params.push(Number(filters.maxPrice));
    query += ` AND price <= $${params.length}`;
  }

  // ✅ Run the query
  const result = await pool.query(query, params);
  return result.rows;
};
