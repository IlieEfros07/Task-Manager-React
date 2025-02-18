import { datasource } from "../utils/db.js";

export const DeleteTaskController = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid task ID format" });
    }

    const task = await datasource.task.findUnique({ where: { id } });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }


    await datasource.task.delete({ where: { id } });
    return res.status(204).end();
  } catch (err) {
    console.error("Error deleting task:", err);

    if (err.code === "P2025") {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(500).json({ error: "Failed to delete task" });
  }
};
