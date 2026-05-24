// backend/routes/auth.js
const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
  // Signup
  router.post('/signup', async (req, res) => {
    const { email, password, full_name, role } = req.body;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name, role } },
    });
    if (error) return res.status(400).json({ error: error.message });
    res.json({ user: data.user });
  });

  // Login
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return res.status(400).json({ error: error.message });
    res.json({ user: data.user, session: data.session });
  });

  return router;
};
