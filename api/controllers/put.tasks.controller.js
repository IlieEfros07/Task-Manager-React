export const PutTaskController = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const task = await datasource.task.update({
      where: { id },
      data: { title, description, completed },
    });
    return res.status(200).json({ task });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
