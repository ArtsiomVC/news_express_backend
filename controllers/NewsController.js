import NewsModel from '../models/News.js';
import CommentModel from '../models/Comment.js';

const REG_EXP = /\s+|,\s*/;
export const getAllNews = async (req, res) => {
  const { tag, sort } = req.query;
  try {
    const news = await NewsModel.find({
      ...(tag && { tags: tag })
    })
      .populate('user', 'name avatarUrl')
      .sort({
        ...(sort && { 'viewsCount': 'desc' })
      }).exec();

    res.json(news);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи'
    });
  }
};

export const getOneNews = async (req, res) => {
  try {
    const news = await NewsModel.findOneAndUpdate({
      _id: req.params.id
    }, {
      $inc: { viewsCount: 1 }
    }, {
      returnDocument: 'after'
    }).populate('user', 'name avatarUrl').exec();

    if (!news) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }
    const comments = await CommentModel.find({
      news: req.params.id
    }).select('text user createdAt')
      .populate('user', 'name avatarUrl createdAt').exec();

    if (!news) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.json({ ...news._doc, comments });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
}

export const createNews = async (req, res) => {
  try {
    const doc = new NewsModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags ? req.body.tags.split(REG_EXP) : [],
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const news = await doc.save();

    res.status(201).json(news);
  } catch (err) {
    console.log(err);
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await NewsModel.findOneAndDelete({
      _id: req.params.id
    });

    if (!news) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить статью',
    });
  }
};

export const updateNews = async (req, res) => {
  try {
    await NewsModel.findOneAndUpdate({
      _id: req.params.id,
    }, {
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags ? req.body.tags.split(REG_EXP) : [],
      imageUrl: req.body.imageUrl,
      user: req.body.userId,
    }, {
      returnDocument: 'after',
    });
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить статью'
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const news = await NewsModel.find().limit(5).exec();
    const tags = news.map(singleNews => singleNews.tags).flat().slice(0, 5);

    res.json([...new Set(tags)]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи'
    });
  }
};
