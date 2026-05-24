import express from 'express';
import supabase from '../db.js';
const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST /api/products
router.post('/', async (req, res) => {
  const { seller_id, name, description, price, stock, images } = req.body;
  const { data, error } = await supabase
    .from('products')
    .insert([{ seller_id, name, description, price, stock, images }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Product added successfully', data });
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, images } = req.body;
  const { data, error } = await supabase
    .from('products')
    .update({ name, description, price, stock, images })
    .eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Product updated successfully', data });
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Product deleted successfully' });
});

export default router;
