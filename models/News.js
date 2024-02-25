import { model, Schema } from 'mongoose';

const newsSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  imageUrl: String,
  comments: {
    type: Array,
    ref: 'Comment',
    default: [],
  },
}, { timestamps: true });

export default model('News', newsSchema);
