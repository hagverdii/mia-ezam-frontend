import axios from "axios";

const BASE_URL = 'http://172.16.4.116:8080'

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

export const getAllEmployees = (jwtToken) => {
    return axios.get(
        `${BASE_URL}/api/v1/allEmployees`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

export const getAllPurposes = (jwtToken) => {
    return axios.get(
        `${BASE_URL}/api/v1/purposes`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

export const getAllReasons = (jwtToken) => {
    return axios.get(
        `${BASE_URL}/api/v1/reasons`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

export const getAllPosResults = (jwtToken) => {
    return axios.get(
        `${BASE_URL}/api/v1/posResults`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

export const getAllResulConclusions = (jwtToken) => {
    return axios.get(
        `${BASE_URL}/api/v1/resultConclusions`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

export const getAllRegions = (jwtToken) => {
    return axios.get(
        `${BASE_URL}/api/v1/regions`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

export const getAllHelps = (jwtToken) => {
    return axios.get(
        `${BASE_URL}/api/v1/helps`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

export const updateEmployeeById = (jwtToken, employeeId, updatedEmployee) => {
    return axios.put(
        `${BASE_URL}/api/v1/employees/${employeeId}`,
        updatedEmployee,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

export const deleteEmployeeById = (jwtToken, employeeId) => {
    return axios.delete(
        `${BASE_URL}/api/v1/employees/${employeeId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

export const addNewEmployee = (jwtToken, newEmployee) => {
    return axios.post(
        `${BASE_URL}/api/v1/employees`,
        newEmployee,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

export const addNewBusinessTrip = (jwtToken, newBusinessTrip) => {
    return axios.post(
        `${BASE_URL}/api/v1/businessTrips`,
        newBusinessTrip,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            withCredentials: true
        }
    )
}

