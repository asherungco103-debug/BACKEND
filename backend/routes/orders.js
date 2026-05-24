import express from 'express';
import supabase from '../db.js';
const router = express.Router();

// GET /api/orders
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('orders').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST /api/orders
router.post('/', async (req, res) => {
  const { user_id, product_id, quantity, status } = req.body;
  const { data, error } = await supabase
    .from('orders')
    .insert([{ user_id, product_id, quantity, status }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Order placed successfully', data });
});

// PUT /api/orders/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Order updated successfully', data });
});

// DELETE /api/orders/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Order cancelled successfully' });
});

export default router;
