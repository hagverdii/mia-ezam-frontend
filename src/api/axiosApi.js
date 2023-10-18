import axios from "axios";

const BASE_URL = 'http://10.14.33.67:8081'

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