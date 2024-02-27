import { Router } from 'express';
import fs from 'fs';
import multer from 'multer';
import { checkAuth } from '../utils/index.js';
import authRouter from './auth.js';
import newsRouter from './news.js';
import commentsRouter from './comments.js';

const router = Router();

const storage = multer.diskStorage({
  destination: (_, a, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.use('/news', newsRouter);
router.use('/auth', authRouter);
router.use('/comments', commentsRouter);
router.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
  res.json({ url: `/uploads/${req.file.originalname}` });
});

export default router;
