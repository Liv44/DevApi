import { api } from 'boot/axios'

export const getTasksByListId = async (listId) => {
    return api.get(`/tasks/list/${listId}`)
}

export const createTask = async ({ listId, title, description }) => {
    return api.post(`/tasks`, { "title": title, "description": description, "list": listId })
}

export const updateTask = async ({ taskId, title, description, isDone }) => {
    return api.put(`/tasks/${taskId}`, { "title": title, "description": description, "isDone": isDone })
}

export const deleteTask = async (id) => {
    return api.delete(`/tasks/${id}`)
}