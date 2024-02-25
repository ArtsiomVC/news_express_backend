import { body } from 'express-validator';

export const commentCreateValidation = [
  body("text", "Комментарий должен быть более 3x символов").trim().isString(),
]
