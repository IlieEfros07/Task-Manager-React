import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTasks, deleteTask, updateTask } from "../services/taskService";
import { useState } from "react";

const TaskList = () => {
  const queryClient = useQueryClient();
  const [expandedTasks, setExpandedTasks] = useState({});

  const { data: tasks = [], isLoading, error } = useQuery("tasks", getTasks);
  const deleteMutation = useMutation(deleteTask, {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });

  const updateMutation = useMutation(updateTask, {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });

  const toggleTaskExpansion = (taskId) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  // Helper function to properly parse task content
  const parseTaskContent = (task) => {
    // Check if title contains newlines (indicator of steps)
    if (!task.title || !task.title.includes("\n")) {
      return { title: task.title, steps: null };
    }

    // Split the content by newlines
    const lines = task.title.split("\n").filter((line) => line.trim());

    // First line is the title
    const title = lines[0];

    // The rest is the steps
    const steps = lines.slice(1).join("\n");

    return { title, steps };
  };

  if (isLoading) return <p className="text-blue-500">Loading tasks...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="w-full">
      <ul className="space-y-4 w-full">
        {tasks.map((task) => {
          const { title, steps } = parseTaskContent(task);
          const isExpanded = expandedTasks[task.id];

          return (
            <li
              key={task.id}
              className="p-3 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <input
                    className="mr-4 h-6 w-6 text-blue-500 border-gray-300 rounded-full focus:ring-blue-500 cursor-pointer"
                    type="checkbox"
                    checked={task.completed || false}
                    onChange={() =>
                      updateMutation.mutate({
                        id: task.id,
                        completed: !task.completed,
                      })
                    }
                    aria-label={`Mark task "${title}" as ${
                      task.completed ? "incomplete" : "completed"
                    }`}
                  />
                  <span
                    className={`text-lg truncate ${
                      task.completed
                        ? "line-through text-gray-500 dark:text-gray-400"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {title}
                  </span>
                </div>
                <div className="flex">
                  {steps && (
                    <button
                      onClick={() => toggleTaskExpansion(task.id)}
                      className="ml-2 px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
                    >
                      {isExpanded ? "Hide Steps" : "Show Steps"}
                    </button>
                  )}
                  <button
                    onClick={() => deleteMutation.mutate(task.id)}
                    className="ml-2 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {steps && isExpanded && (
                <div className="mt-3 pl-10 pr-4 pb-1 pt-2 border-t dark:border-gray-700">
                  <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                    {steps}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
