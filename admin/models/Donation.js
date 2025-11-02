import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  phone: { type: String },
  message: { type: String }
});

const Donation = mongoose.model('Donation.js', donationSchema);
export default Donation;