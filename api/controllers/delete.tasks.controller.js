export const DeleteTaskController = async (req, res) => {
  const { id } = req.params;

  try {
    await datasource.task.delete({ where: { id } });
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
