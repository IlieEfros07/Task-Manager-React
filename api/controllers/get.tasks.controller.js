import { datasource } from "../utils/db.js";

export const GetTasksController = async (req, res) => {
  try {
    const tasks = await datasource.task.findMany();
    return res.status(200).json({ tasks });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
