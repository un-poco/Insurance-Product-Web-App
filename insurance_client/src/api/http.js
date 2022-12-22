import axios from 'axios'

export const PostAsync = (api, params) => axios.post('api1'+api, params)