import axios from "axios";

const BASE_URL = 'http://172.16.4.14:8080'

export const registerUser = (url, credentials) => {
    return axios.post(
        `${BASE_URL}${url}`,
        credentials,
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }
    )
}

export const loginUser = (url, credentials) => {
    return axios.post(
        `${BASE_URL}${url}`,
        credentials,
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }
    )
}