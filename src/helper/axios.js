import axios from 'axios'
import { api } from '../urlConfig'

const axiosInstance = axios.create({
    baseURL: api,
    // headers: {
    //     'authorization': ''
    // }
})

export default axiosInstance;

