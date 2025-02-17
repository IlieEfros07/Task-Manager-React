import { body } from "express-validator";

export const CreateTaskDTO = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  body("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Description must be at most 255 characters"),
];
