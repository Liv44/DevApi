import { api } from 'boot/axios'

export const getTasksByListId = async (listId) => {
    return api.get(`/tasks/list/${listId}`)
}