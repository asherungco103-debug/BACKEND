import express from 'express';
import supabase from '../db.js';
const router = express.Router();

// GET /api/merchant
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('merchants').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST /api/merchant
router.post('/', async (req, res) => {
  const { user_id, store_name, description } = req.body;
  const { data, error } = await supabase
    .from('merchants')
    .insert([{ user_id, store_name, description }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Merchant profile created', data });
});

// PUT /api/merchant/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { store_name, description } = req.body;
  const { data, error } = await supabase
    .from('merchants')
    .update({ store_name, description })
    .eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Merchant updated successfully', data });
});

// DELETE /api/merchant/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('merchants').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Merchant deleted successfully' });
});

export default router;
