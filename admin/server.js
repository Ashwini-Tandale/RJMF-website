import express from'express';
import mongoose from'mongoose';
import path from'path';

// Route imports
import adminRoutes  from './routes/adminRoutes.js';
import staffRoutes  from './routes/staffRoutes.js';
import donationRoutes  from './routes/donationRoutes.js';

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Manual CORS setup (for frontend access)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// ✅ MongoDB connection
mongoose.connect('mongodb://localhost:27017/adminPanelDB')
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Route mounting
app.use('/api/admin', adminRoutes);       // Admin login
app.use('/api/staff', staffRoutes);       // Staff CRUD
app.use('/api/donations', donationRoutes); // Donation form + view

// ✅ Server start
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});