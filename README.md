# Streamoid Backend Assignment (Node.js + Express + PostgreSQL)


## Setup
1. Create PostgreSQL database named `streamoid`.
2. Update credentials in `db.js`.
3. Run:
```bash
npm install
node server.js
```


Server runs at: `http://localhost:8000`


##  APIs


### 1️⃣ Upload CSV
**POST** `/upload`
- Upload CSV file (key: `file`)


**Response:**
```json
{ "stored": 8, "failed": 2 }
```


### 2️⃣ List Products
**GET** `/products?page=1&limit=10`


**Response:**
```json
{ "page": 1, "limit": 10, "total": 15, "products": [ ... ] }
```


### 3️⃣ Search Products
**GET** `/products/search?brand=StreamThreads&minPrice=500&maxPrice=2000`


**Response:** Array of matching products.


## Validation Rules
- `price <= mrp`
- `quantity >= 0`
- Required: `sku, name, brand, mrp, price`


---
// Built with **Express + PostgreSQL + multer + csv-parser**