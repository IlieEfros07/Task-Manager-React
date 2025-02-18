import axios from "axios";

export const generateTaskSuggestion = async (input) => {
  try {
    const response = await axios.post(
      "http://localhost:3107/api/v1/tasks/generate-task-suggestion",
      { input }
    );
    return response.data.suggestion;
  } catch (error) {
    console.error("Error generating task suggestion:", error);
    return "Sorry, there was an error generating the suggestion.";
  }
};
