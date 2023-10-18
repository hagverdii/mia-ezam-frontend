import axios from "axios";
import useAuth from "../hooks/useAuth.js";

const BASE_URL = 'http://10.14.33.67:8081'

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

export const fetchEmployees = (url, jwtToken) => {
    return axios.get(
        `${BASE_URL}${url}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}