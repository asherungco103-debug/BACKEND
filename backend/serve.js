// backend/server.js
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase connection
const supabase = createClient(
  'https://YOUR_PROJECT.supabase.co', // replace with your Supabase URL
  'YOUR_SUPABASE_API_KEY' // replace with your Supabase API key
);

// Test route
app.get('/', (req, res) => {
  res.send('E-commerce backend running 🚀');
});

// Import routes
const authRoutes = require('./routes/auth')(supabase);
const productRoutes = require('./routes/products')(supabase);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
