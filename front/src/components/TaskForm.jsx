import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createTask } from "../services/taskService";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setTitle("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({ title });
      }}
      class="flex flex-col space-y-4 w-full"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
      />
      <button
        type="submit"
        class="py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200 w-full"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
