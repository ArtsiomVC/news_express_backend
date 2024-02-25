import CommentModel from '../models/Comment.js';

export const createComment = async (req, res) => {
  try {
    const doc = new CommentModel({
      text: req.body.text,
      news: req.body.newsId,
      user: req.userId,
    });

    const news = await doc.save();

    res.status(201).json(news);
  } catch (err) {
    console.log(err);
  }
};

export const getLastComments = async (req, res) => {
  try {
    const comments = await CommentModel.find().select('createdAt text user')
      .populate('user', 'name avatarUr').limit(5).exec();

    res.json(comments);
  } catch (err) {
    console.log(err);
  }
};
