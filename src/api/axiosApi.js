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
    const sort = sortBy
        ? `&sortBy=${sortBy}`
        : ''
    const size = pageSize
        ? `pageSize=${pageSize}`
        : 'pageSize=10'
    const number = pageNumber
        ? `&pageNumber=${pageNumber}`
        : '&pageNumber=0'
    const url = search
        ? `${BASE_URL}/api/v1/employees/allFields/${encodeURIComponent(search)}?${size}${number}${sort}`
        : `${BASE_URL}/api/v1/employees?${size}${number}${sort}`

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