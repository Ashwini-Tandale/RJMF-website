import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: String,
  phone: String
});

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
