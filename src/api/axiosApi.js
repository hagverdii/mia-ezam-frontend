import axios from "axios";

const BASE_URL = 'http://172.16.4.157:8080'

export const verifyJwt = (jwtToken) => {
    return axios.post(
        `${BASE_URL}/api/auth/verify`,
        {jwt: jwtToken},
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }
    )
}

export const loginUser = (credentials) => {
    return axios.post(
        `${BASE_URL}/api/auth/signin`,
        credentials,
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }
    )
}

export const getEmployeesPageable = (jwtToken, pageSize, pageNumber, search, sortBy) => {
    const url = search
        ? `${BASE_URL}/api/v1/employees/allFields/${encodeURIComponent(search)}?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortBy}`
        : `${BASE_URL}/api/v1/employees?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortBy}`

    return axios.get(
        url,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}