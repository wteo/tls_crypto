import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
  coin: String,
  imageLink: String
});

const groupSchema = new mongoose.Schema({
  category: String,
  group: String,
  description: String,
  coins: [coinSchema]
});

const Categories = mongoose.model('Categories', groupSchema);

export default Categories;
