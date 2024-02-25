import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  news: {
    type: Schema.Types.ObjectId,
    ref: 'News',
    require: true,
  },
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
