import { body } from 'express-validator';

export const newsCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 5 }).isString(),
  body("text", "Введите текст статьи").optional().isString(),
  body("tags", "Укажите тэги через запятую").trim().optional().isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
]
