import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTasks, deleteTask, updateTask } from "../services/taskService";

const TaskList = () => {
  const queryClient = useQueryClient();

  // Add error handling and default value
  const { data: tasks = [], isLoading, error } = useQuery("tasks", getTasks);
  const deleteMutation = useMutation(deleteTask, {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });

  const updateMutation = useMutation(updateTask, {
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries("tasks");
      const previousTasks = queryClient.getQueryData("tasks");
      queryClient.setQueryData("tasks", (old) =>
        old.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        )
      );
      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData("tasks", context.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  // Handle loading and error states
  if (isLoading) return <p className="text-blue-500">Loading tasks...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="w-full">
      {updateMutation.isLoading && (
        <p className="text-blue-500 mb-2">Updating task...</p>
      )}

      <ul className="space-y-4 w-full">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-3 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800"
          >
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
                aria-label={`Mark task "${task.title}" as ${
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
                {task.title}
              </span>
            </div>
            <button
              onClick={() => deleteMutation.mutate(task.id)}
              className="ml-4 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              disabled={deleteMutation.isLoading}
            >
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
