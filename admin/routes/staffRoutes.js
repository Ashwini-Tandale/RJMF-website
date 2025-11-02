import express from 'express';
import Staff from '../models/staff.js';

const router = express.Router();

// 🟢 Get all staff
router.get('/', async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.json(staffList); // ✅ returns an array
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
});

// 🟢 Add staff
router.post('/add', async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add staff' });
  }
});

// 🟢 Delete staff
router.delete('/delete/:id', async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: 'Staff deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete staff' });
  }
});

export default router;
