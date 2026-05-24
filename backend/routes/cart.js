// backend/routes/cart.js
const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
  // Get cart items
  router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('cart_id', user_id);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Add item to cart
  router.post('/', async (req, res) => {
    const { cart_id, product_id, quantity } = req.body;
    const { data, error } = await supabase
      .from('cart_items')
      .insert([{ cart_id, product_id, quantity }]);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Remove item
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('cart_items').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Item removed' });
  });

  return router;
};
