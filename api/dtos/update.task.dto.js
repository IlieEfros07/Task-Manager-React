import { body } from "express-validator";

export const UpdateTaskDTO = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3, max: 2000 })
    .withMessage("Title must be between 3 and 100 characters"),
  body("description")
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Description must be at most 2000 characters"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
];
