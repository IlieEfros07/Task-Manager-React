import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskLists.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("bg-gray-900", "text-white");
      document.body.classList.remove("bg-white", "text-gray-900");
    } else {
      document.body.classList.add("bg-white", "text-gray-900");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`mt-10 flex items-center justify-center min-h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div
          className={`${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } p-8 rounded-lg shadow-lg w-full max-w-lg`}
        >
          <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>
          <div className="flex flex-col space-y-6 w-full">
            <TaskForm />
            <TaskList />
          </div>
          <button
            onClick={toggleTheme}
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 rounded-full"
          >
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
