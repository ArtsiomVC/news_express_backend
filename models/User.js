import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    require: true,
  },
  avatarUrl: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema);
