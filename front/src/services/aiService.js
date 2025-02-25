export const generateTaskSuggestion = async (prompt) => {
  try {
    const response = await fetch(
      "http://localhost:3107/api/v1/tasks/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch task suggestion");
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating task suggestion:", error.message);
    return { error: "Failed to generate task suggestion" };
  }
};
