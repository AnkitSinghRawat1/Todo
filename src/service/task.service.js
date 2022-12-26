import api from "../http";

export const getAllPost = () => api.get("/task");
export const addNewTask = (payload) => api.post("/task", payload);
export const updateTask = (id, payload) =>
  api.put(`/task/${id}`, payload);
export const deleteTask = (id) => api.delete(`/task/${id}`);
