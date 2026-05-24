import express from 'express';
import supabase from '../db.js';
const router = express.Router();

// GET /api/cart
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('cart').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST /api/cart/add
router.post('/add', async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  const { data, error } = await supabase
    .from('cart')
    .insert([{ user_id, product_id, quantity }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Item added to cart', data });
});

// PUT /api/cart/update/:id
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const { data, error } = await supabase
    .from('cart')
    .update({ quantity })
    .eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Cart updated successfully', data });
});

// DELETE /api/cart/remove/:id
router.delete('/remove/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('cart').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Item removed from cart' });
});

export default router;
