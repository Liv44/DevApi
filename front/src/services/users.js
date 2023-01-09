import { api } from 'boot/axios'

export const register = async (params) => {
    return api.post('/users/register', params)
}

export const login = async (params) => {
    return api.post('/users/login', params)
}

export const getUserInfos = async () => {
    return api.get('/users/me')
}