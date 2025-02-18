import { generateTaskSuggestion } from "../services/aiService.js";

export const getTaskSuggestion = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Input is required" });
    }

    const suggestion = await generateTaskSuggestion(input);
    return res.status(200).json({ suggestion });
  } catch (error) {
    console.error("Error in AI controller:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate task suggestion" });
  }
};
