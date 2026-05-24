import express from 'express';
import supabase from '../db.js';
const router = express.Router();

// GET /api/admin/users
router.get('/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// PUT /api/admin/ban/:id
router.put('/ban/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('users')
    .update({ banned: true })
    .eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'User banned successfully', data });
});

// PUT /api/admin/approve-product/:id
router.put('/approve-product/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('products')
    .update({ approved: true })
    .eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Product approved successfully', data });
});

// DELETE /api/admin/user/:id
router.delete('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'User deleted successfully' });
});

export default router;
