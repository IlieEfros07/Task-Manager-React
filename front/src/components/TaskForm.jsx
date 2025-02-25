import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createTask } from "../services/taskService.js";
import { generateTaskSuggestion } from "../services/aiService.js";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [suggestedSteps, setSuggestedSteps] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setTitle("");
      setSuggestedSteps("");
    },
    onError: (error) => {
      console.error("Error creating task:", error);
      alert("Failed to save task. Please try again.");
    },
  });

  const handleGenerateSuggestion = async () => {
    if (!title.trim()) return;

    try {
      setIsGenerating(true);
      const suggestion = await generateTaskSuggestion(title);

      if (suggestion.error) {
        setSuggestedSteps(`Error: ${suggestion.error}`);
      } else {
        const content =
          suggestion.choices?.[0]?.message?.content ||
          (typeof suggestion === "string"
            ? suggestion
            : "No suggestion available");
        setSuggestedSteps(content);
      }
    } catch (error) {
      console.error("Error generating suggestion:", error);
      setSuggestedSteps(
        error.response?.data?.error ||
          "Failed to generate suggestion. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const saveTaskWithSteps = () => {
    if (title.trim() && suggestedSteps) {
      // Format the task with the title and steps
      const fullTaskContent = `${title}\n${suggestedSteps}`;

      // Log the data being sent to help debug
      console.log("Saving task with steps:", fullTaskContent);

      // Try with a simpler payload
      mutation.mutate({
        title: fullTaskContent,
        completed: false,
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (title.trim()) {
          if (suggestedSteps) {
            saveTaskWithSteps();
          } else {
            mutation.mutate({ title: title.trim(), completed: false });
          }
        }
      }}
      className="flex flex-col space-y-4 w-full"
    >
      <div className="relative">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task (e.g., Clean my room)"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
          disabled={mutation.isLoading}
        />
      </div>

      <button
        type="button"
        onClick={handleGenerateSuggestion}
        className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-200"
        disabled={isGenerating || !title.trim()}
      >
        {isGenerating ? "Generating Steps..." : "Get Step-by-Step Guide"}
      </button>

      {suggestedSteps && (
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Step-by-Step Guide:
          </h3>
          <div
            className="text-sm text-gray-600 dark:text-gray-300 mb-2 whitespace-pre-line"
            style={{ lineHeight: "1.5" }}
          >
            {suggestedSteps}
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={saveTaskWithSteps}
              className="text-sm py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            >
              Save with Steps
            </button>
            <button
              type="button"
              onClick={() => setSuggestedSteps("")}
              className="text-sm py-1 px-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        disabled={mutation.isLoading || !title.trim()}
      >
        {mutation.isLoading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
