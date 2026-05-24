import express from 'express';
import supabase from '../db.js';
const router = express.Router();

// POST /signup
router.post('/signup', async (req, res) => {
  const { email, password, full_name } = req.body;
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password, full_name, role: 'customer' }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'User registered successfully', data });
});

// POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();
  if (error || !data) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ message: 'Login successful', user: data });
});

export default router;
