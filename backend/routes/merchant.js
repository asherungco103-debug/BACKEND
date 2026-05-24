// backend/routes/merchants.js
const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
  // Create merchant profile
  router.post('/', async (req, res) => {
    const { user_id, shop_name, description, profile_photo } = req.body;
    const { data, error } = await supabase
      .from('merchants')
      .insert([{ user_id, shop_name, description, profile_photo }])
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Get merchant profile
  router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { data, error } = await supabase
      .from('merchants')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Merchant’s products
  router.get('/:merchant_id/products', async (req, res) => {
    const { merchant_id } = req.params;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('seller_id', merchant_id);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  // Sales dashboard (basic analytics)
  router.get('/:merchant_id/dashboard', async (req, res) => {
    const { merchant_id } = req.params;
    const { data, error } = await supabase.rpc('merchant_sales_summary', {
      merchant_id,
    }); // Supabase function for analytics

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  return router;
};
