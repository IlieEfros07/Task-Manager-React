import axios from "axios";

const API_URL = "http://localhost:3107/api/v1/tasks";

export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data.tasks;
};

export const createTask = async (task) => {
  const res = await axios.post(API_URL, task);
  return res.data.task;
};

export const updateTask = async (taskData) => {
  const { id, ...data } = taskData;
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data.task;
};

export const deleteTask = async (id) => {
  const res =  await axios.delete(`${API_URL}/${id}`);
  return res.task
};
