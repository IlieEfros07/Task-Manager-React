import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTasks, deleteTask, updateTask } from "../services/taskService";

const TaskList = () => {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading } = useQuery("tasks", getTasks);
  const deleteMutation = useMutation(deleteTask, {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });
  const updateMutation = useMutation(updateTask, {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });

  if (isLoading) return <p>Loading...</p>;

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
                class="mr-4 h-6 w-6 text-blue-500 border-gray-300 rounded-full focus:ring-blue-500"
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  updateMutation.mutate(task.id, {
                    ...task,
                    completed: !task.completed,
                  })
                }
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
