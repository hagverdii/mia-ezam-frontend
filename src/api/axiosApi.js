import axios from "axios";

const BASE_URL = 'http://10.11.193.29:8080'

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

export const getAllEmployeesPageable = (jwtToken, pageSize, pageNumber, search, sortBy) => {
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

export const getAllRanks = (jwtToken) => {
    return axios.get(
        `${BASE_URL}/api/v1/ranks`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

export const getAllDepartments = (jwtToken) => {
    return axios.get(
        `${BASE_URL}/api/v1/departments`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

export const getAllPositions = (jwtToken) => {
    return axios.get(
        `${BASE_URL}/api/v1/positions`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

export const updateEmployeeById = async (jwtToken, employeeId, firstName, lastName, fatherName, policeCard, rank, position, department) => {
    return await axios.put(
        `${BASE_URL}/api/v1/employees/${employeeId}`,
        {
            firstName: `${firstName}`,
            lastName: `${lastName}`,
            fatherName: `${fatherName}`,
            policeCard: `${policeCard}`,
            rank: {id: Number(rank)},
            position: {id: Number(position)},
            department: {id: Number(department)},
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}