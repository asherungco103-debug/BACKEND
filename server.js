import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import cartRouter from './routes/cart.js';
import merchantRouter from './routes/merchant.js';
import adminRouter from './routes/admin.js';

dotenv.config();
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Backend is running successfully!');
  });
      
// Mount routes
app.use('/api/auth', authRouter);        // POST signup, POST login
app.use('/api/products', productsRouter); // GET, POST, PUT, DELETE
app.use('/api/orders', ordersRouter);     // GET, POST, PUT, DELETE
app.use('/api/cart', cartRouter);         // GET, POST, PUT, DELETE
app.use('/api/merchant', merchantRouter); // GET, POST, PUT, DELETE
app.use('/api/admin', adminRouter);       // GET, PUT, DELETE

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
