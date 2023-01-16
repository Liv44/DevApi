import { api } from 'boot/axios'

export const register = async (params) => {
    return api.post('/users/register', {
        "email": params.email,
        "password": params.password,
        "lastname": params.lastname,
        "firstname": params.firstname,
        "terms_and_conditions": params.terms_and_conditions
    })
}

export const login = async (params) => {
    return api.post('/users/login', params)
}

export const getUserInfos = async () => {
    return api.get('/users/me')
}