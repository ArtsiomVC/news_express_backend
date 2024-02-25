import { Router } from 'express';
import * as NewsController from '../controllers/NewsController.js';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import { newsCreateValidation } from '../validations/news.js';

const router = Router();

router.get('/tags', NewsController.getLastTags);
router.get('/', NewsController.getAllNews);
router.get('/:id', NewsController.getOneNews);
router.post('/', checkAuth, newsCreateValidation, handleValidationErrors, NewsController.createNews);
router.patch('/:id', checkAuth, newsCreateValidation, handleValidationErrors, NewsController.updateNews);
router.delete('/:id', checkAuth, NewsController.deleteNews);

export default router;
