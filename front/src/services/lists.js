import { api } from 'boot/axios'

export const getAllLists = async () => {
    return api.get('/lists')
}

export const createNewList = async (params) => {
    return api.post('/lists', params)
}

export const updateList = async (params) => {
    return api.put(`/lists/${params.id}`, { "title": params.title })
}

export const deleteList = async (id) => {
    return api.delete(`/lists/${id}`)
}