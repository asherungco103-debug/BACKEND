// backend/routes/admin.js
const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
  // Approve merchant
  router.post('/approve-merchant/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
      .from('merchants')
      .update({ verified: true })
      .eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Merchant approved ✅' });
  });

  // Ban user
  router.post('/ban-user/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
      .from('users')
      .update({ banned: true })
      .eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'User banned 🚫' });
  });

  // Approve product
  router.post('/approve-product/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
      .from('products')
      .update({ approved: true })
      .eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Product approved ✅' });
  });

  return router;
};
