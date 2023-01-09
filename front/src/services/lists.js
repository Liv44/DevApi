import { api } from 'boot/axios'

export const getAllLists = async () => {
    return api.get('/lists')
}