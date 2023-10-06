import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  tokenExpiration: Date
});

const Users = mongoose.model('Users', userSchema);

export default Users;
