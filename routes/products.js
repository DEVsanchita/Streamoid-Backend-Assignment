import express from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import { insertProduct, getAllProducts, countProducts, searchProducts } from '../models/productModel.js';


const router = express.Router();
const upload = multer({ dest: 'uploads/' });


// ✅ POST /upload
router.post('/upload', upload.single('file'), async (req, res) => {
const filePath = req.file.path;
let stored = 0, failed = 0;


const rows = [];
fs.createReadStream(filePath)
.pipe(csv())
.on('data', (row) => rows.push(row))
.on('end', async () => {
for (const row of rows) {
try {
const { sku, name, brand, color, size, mrp, price, quantity } = row;


if (!sku || !name || !brand || !mrp || !price) {
failed++;
continue;
}


const mrpNum = Number(mrp);
const priceNum = Number(price);
const qtyNum = Number(quantity ?? 0);


if (priceNum > mrpNum || qtyNum < 0 || isNaN(mrpNum) || isNaN(priceNum)) {
failed++;
continue;
}


await insertProduct({ sku, name, brand, color, size, mrp: mrpNum, price: priceNum, quantity: qtyNum });
stored++;
} catch (err) {
failed++;
}
}
fs.unlinkSync(filePath);
res.json({ stored, failed });
});
});

// ✅ GET /products
router.get('/products', async (req, res) => {
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;
const offset = (page - 1) * limit;


const products = await getAllProducts(offset, limit);
const total = await countProducts();


res.json({ page, limit, total, products });
});


// ✅ GET /products/search
router.get('/products/search', async (req, res) => {
const filters = {
brand: req.query.brand,
color: req.query.color,
minPrice: req.query.minPrice,
maxPrice: req.query.maxPrice,
};
const results = await searchProducts(filters);
res.json(results);
});


export default router;