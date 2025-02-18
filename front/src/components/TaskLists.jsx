import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTasks, deleteTask, updateTask } from "../services/taskService";

const TaskList = () => {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading } = useQuery("tasks", getTasks);
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

  // In TaskList.jsx

    updateMutation.isLoading && (
      <p className="text-blue-500">Updating task...</p>
    );


  return (
    <>
      <ul class="space-y-4 w-full">
        {tasks.map((task) => (
          <li
            key={task.id}
            class="flex items-center justify-between p-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <div class="flex items-center ">
              <input
                className="mr-4 h-6 w-6 text-blue-500 border-gray-300 rounded-full focus:ring-blue-500"
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
                class={`text-lg ${
                  task.completed ? "line-through text-gray-500" : "text-white"
                }`}
              >
                {task.title}
              </span>
            </div>
            <button
              onClick={() => deleteMutation.mutate(task.id)}
              class="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
