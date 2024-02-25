import { Router } from 'express';
import * as CommentController from '../controllers/CommentController.js';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import { commentCreateValidation } from '../validations/comment.js';

const router = Router();

router.get('/latest', CommentController.getLastComments);
router.post('/', checkAuth, commentCreateValidation, handleValidationErrors, CommentController.createComment);

export default router;
