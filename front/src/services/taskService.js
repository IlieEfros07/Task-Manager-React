import axios from "axios";

const API_URL = "http://localhost:3107/api/v1/tasks";

export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data.tasks;
};

export const createTask = async (task) => {
  await axios.post(API_URL, task);
};

export const updateTask = async (id, task) => {
  await axios.put(`${API_URL}/${id}`, task);
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
