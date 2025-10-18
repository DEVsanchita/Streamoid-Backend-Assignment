import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/products.js';
import { initDB } from './db.js';

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', productRoutes);

// Start server after DB is initialized
(async () => {
  await initDB();
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
})();