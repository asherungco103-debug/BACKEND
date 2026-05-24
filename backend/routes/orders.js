// backend/routes/orders.js
const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
  // Place order
  router.post('/', async (req, res) => {
    const { user_id, items, payment_method } = req.body;

    // Calculate total
    let total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{ user_id, total, status: 'pending' }])
      .select()
      .single();

    if (orderError) return res.status(400).json({ error: orderError.message });

    // Insert order items
    for (let item of items) {
      await supabase
        .from('order_items')
        .insert([
          {
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          },
        ]);
    }

    // Insert payment
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert([
        {
          order_id: order.id,
          method: payment_method,
          amount: total,
          status: 'completed',
        },
      ])
      .select()
      .single();

    if (paymentError)
      return res.status(400).json({ error: paymentError.message });

    // Generate receipt
    const receipt = {
      order_id: order.id,
      user_id,
      total,
      payment_method,
      items,
    };

    res.json({ order, payment, receipt });
  });

  // Get user orders
  router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(*)), payments(*)')
      .eq('user_id', user_id);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  });

  return router;
};
