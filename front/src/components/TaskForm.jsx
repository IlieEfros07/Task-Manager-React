import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createTask } from "../services/taskService";
import { generateTaskSuggestion } from "../services/aiService";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [suggestedTitle, setSuggestedTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setTitle("");
      setSuggestedTitle("");
    },
  });

  const handleGenerateSuggestion = async () => {
    if (!title.trim()) return;

    try {
      setIsGenerating(true);
      const suggestion = await generateTaskSuggestion(title);
      setSuggestedTitle(suggestion);
    } catch (error) {
      console.error("Failed to generate suggestion:", error);
      setSuggestedTitle("Could not generate suggestion");
    } finally {
      setIsGenerating(false);
    }
  };

  const useTaskSuggestion = () => {
    if (suggestedTitle) {
      setTitle(suggestedTitle);
      setSuggestedTitle("");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (title.trim()) {
          mutation.mutate({ title: title.trim() });
        }
      }}
      className="flex flex-col space-y-4 w-full"
    >
      <div className="relative">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Task"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
          disabled={mutation.isLoading}
        />
        {mutation.isLoading && (
          <div className="absolute right-2 top-2.5 animate-spin">⏳</div>
        )}
      </div>

      <button
        type="button"
        onClick={handleGenerateSuggestion}
        className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-200"
        disabled={isGenerating || !title.trim()}
      >
        {isGenerating ? "Generating..." : "Get AI Suggestion"}
      </button>

      {suggestedTitle && (
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span className="font-semibold">AI Suggested:</span>{" "}
            {suggestedTitle}
          </p>
          <button
            type="button"
            onClick={useTaskSuggestion}
            className="text-sm py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
          >
            Use This Suggestion
          </button>
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
