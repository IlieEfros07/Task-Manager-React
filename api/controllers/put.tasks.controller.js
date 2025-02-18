import { datasource } from "../utils/db.js";

export const PutTaskController = async (req, res) => {
  const { id: paramId } = req.params;
  const taskId = Number(paramId);

  if (isNaN(taskId)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  const { title, description, completed } = req.body;
  const dataToUpdate = {};

  if (title !== undefined) dataToUpdate.title = title;
  if (description !== undefined) dataToUpdate.description = description;
  if (completed !== undefined) dataToUpdate.completed = completed;

  if (Object.keys(dataToUpdate).length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  try {
    const task = await datasource.task.update({
      where: { id: taskId },
      data: dataToUpdate,
    });
    return res.status(200).json({ task });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(500).json({ error: err.message });
  }
};
