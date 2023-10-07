import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
  coin: String,
  coinLogoLink: String
});

const groupSchema = new mongoose.Schema({
  category: String,
  group: String,
  description: String,
  coins: [coinSchema]
});

const groups = mongoose.model('Groups', groupSchema);

export default groups;
