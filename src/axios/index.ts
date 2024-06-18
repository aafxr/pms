import axios, {AxiosInstance} from "axios";

const baseURL = process.env.REACT_APP_API_URL

export const axiosFetch = axios.create({
    baseURL,
    timeout: 3000,
}) as AxiosInstance;


axiosFetch.interceptors.request.use((config) => {
    config.headers['X-Workspace'] = process.env.REACT_APP_API_KEY
    return config
}, e => Promise.reject(e))