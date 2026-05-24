// backend/routes/products.js
const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
  // Get all products
  router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Add product (merchant only)
  router.post('/', async (req, res) => {
    const { seller_id, category_id, name, description, price, stock, images } =
      req.body;
    const { data, error } = await supabase
      .from('products')
      .insert([
        { seller_id, category_id, name, description, price, stock, images },
      ]);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  return router;
};
