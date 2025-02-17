import {validationResult} from "express-validator";
import { datasource } from "../utils/db.js";

export const PostTaskController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  const { title, description } = req.body;

  try {
    const task = await datasource.task.create({
      data: { title, description },
    });
    return res.status(201).json({ task });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
