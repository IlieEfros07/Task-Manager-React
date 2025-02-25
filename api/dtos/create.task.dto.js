import { body } from "express-validator";

export const CreateTaskDTO = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 2000 })
    .withMessage("Title must be between 3 and 150 characters"),
  body("description")
    .optional()
    .isLength({ max: 2000 }) // Increased for step-by-step instructions
    .withMessage("Description must be at most 2000 characters"),
];