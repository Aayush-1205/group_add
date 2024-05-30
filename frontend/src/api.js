import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const createGroup = (name, userId) =>
  api.post("/groups/create", { name, userId });
export const addUserToGroup = (groupId, userId) =>
  api.post("/groups/add-user", { groupId, userId });
export const inviteUser = (groupId, email) =>
  api.post("/groups/invite", { groupId, email });
export const searchGroups = (name) => api.get(`/groups/search?name=${name}`);
