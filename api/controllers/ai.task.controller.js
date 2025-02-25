import { generateTaskSuggestion } from "../services/aiService.js";

const getTaskSuggestion = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const result = await generateTaskSuggestion(prompt);

  if (result.error) {
    return res.status(500).json({ error: result.error });
  }

  res.json(result);
};

export { getTaskSuggestion };
