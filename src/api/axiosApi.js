import axios from 'axios'

const BASE_URL = 'http://10.14.33.67:8080'

export const verifyJwt = (jwtToken) => {
	return axios.post(
		`${BASE_URL}/api/auth/verify`,
		{ jwt: jwtToken },
		{
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true,
		}
	)
}

export const loginUser = (credentials) => {
	return axios.post(`${BASE_URL}/api/auth/signin`, credentials, {
		headers: { 'Content-Type': 'application/json' },
		withCredentials: true,
	})
}

export const getAllEmployeesPageable = (
	jwtToken,
	pageSize,
	pageNumber,
	search,
	sortBy
) => {
	const sort = sortBy ? `&sortBy=${sortBy}` : ''
	const size = pageSize ? `pageSize=${pageSize}` : 'pageSize=10'
	const number = pageNumber ? `&pageNumber=${pageNumber}` : '&pageNumber=0'
	const url = search
		? `${BASE_URL}/api/v1/employees/allFields/${encodeURIComponent(
				search
		  )}?${size}${number}${sort}`
		: `${BASE_URL}/api/v1/employees?${size}${number}${sort}`

	return axios.get(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const getAllRanks = (jwtToken) => {
	return axios.get(`${BASE_URL}/api/v1/ranks`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const getAllDepartments = (jwtToken) => {
	return axios.get(`${BASE_URL}/api/v1/departments`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const getAllPositions = (jwtToken) => {
	return axios.get(`${BASE_URL}/api/v1/positions`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const getAllEmployees = (jwtToken) => {
	return axios.get(`${BASE_URL}/api/v1/allEmployees`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const getAllPurposes = (jwtToken) => {
	return axios.get(`${BASE_URL}/api/v1/purposes`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const getAllReasons = (jwtToken) => {
	return axios.get(`${BASE_URL}/api/v1/reasons`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const getAllPosResults = (jwtToken) => {
	return axios.get(`${BASE_URL}/api/v1/posResults`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const getAllResulConclusions = (jwtToken) => {
	return axios.get(`${BASE_URL}/api/v1/resultConclusions`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const getAllRegions = (jwtToken) => {
	return axios.get(`${BASE_URL}/api/v1/regions`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const getAllHelps = (jwtToken) => {
	return axios.get(`${BASE_URL}/api/v1/helps`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const updateEmployeeById = (jwtToken, employeeId, updatedEmployee) => {
	return axios.put(
		`${BASE_URL}/api/v1/employees/${employeeId}`,
		updatedEmployee,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
			withCredentials: true,
		}
	)
}

export const deleteEmployeeById = (jwtToken, employeeId) => {
	return axios.delete(`${BASE_URL}/api/v1/employees/${employeeId}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const addNewEmployee = (jwtToken, newEmployee) => {
	return axios.post(`${BASE_URL}/api/v1/employees`, newEmployee, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const addNewBusinessTrip = (jwtToken, newBusinessTrip) => {
	return axios.post(`${BASE_URL}/api/v1/businessTrips`, newBusinessTrip, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const findBusinessTripById = (jwtToken, tripId) => {
	return axios.get(`${BASE_URL}/api/v1/businessTrips/${tripId}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const deleteBusinessTripById = (jwtToken, tripId) => {
	return axios.delete(`${BASE_URL}/api/v1/businessTrips/${tripId}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const updateBusinessTrip = (jwtToken, tripId, newBusinessTrip) => {
	return axios.put(
		`${BASE_URL}/api/v1/businessTrips/${tripId}`,
		newBusinessTrip,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
			withCredentials: true,
		}
	)
}

export const deleteRank = (jwtToken, id) => {
	return axios.delete(`${BASE_URL}/api/v1/ranks/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const addRank = (jwtToken, rank) => {
	return axios.post(`${BASE_URL}/api/v1/ranks`, rank, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const deletePosition = (jwtToken, id) => {
	return axios.delete(`${BASE_URL}/api/v1/positions/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const addPosition = (jwtToken, position) => {
	return axios.post(`${BASE_URL}/api/v1/positions`, position, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const deleteDepartment = (jwtToken, id) => {
	return axios.delete(`${BASE_URL}/api/v1/departments/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const addDepartment = (jwtToken, department) => {
	return axios.post(`${BASE_URL}/api/v1/departments`, department, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const deletePurpose = (jwtToken, id) => {
	return axios.delete(`${BASE_URL}/api/v1/purposes/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const addPurpose = (jwtToken, purpose) => {
	return axios.post(`${BASE_URL}/api/v1/purposes`, purpose, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const deleteHelp = (jwtToken, id) => {
	return axios.delete(`${BASE_URL}/api/v1/helps/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const addHelp = (jwtToken, help) => {
	return axios.post(`${BASE_URL}/api/v1/helps`, help, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const deleteReason = (jwtToken, id) => {
	return axios.delete(`${BASE_URL}/api/v1/reasons/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const addReason = (jwtToken, reason) => {
	return axios.post(`${BASE_URL}/api/v1/reasons`, reason, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const deletePosResult = (jwtToken, id) => {
	return axios.delete(`${BASE_URL}/api/v1/posResults/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const addPosResult = (jwtToken, posResult) => {
	return axios.post(`${BASE_URL}/api/v1/posResults`, posResult, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const deleteConclusion = (jwtToken, id) => {
	return axios.delete(`${BASE_URL}/api/v1/resultConclusions/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const addConclusion = (jwtToken, conclusion) => {
	return axios.post(`${BASE_URL}/api/v1/resultConclusions`, conclusion, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const deleteRegion = (jwtToken, id) => {
	return axios.delete(`${BASE_URL}/api/v1/regions/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const addRegion = (jwtToken, region) => {
	return axios.post(`${BASE_URL}/api/v1/regions`, region, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const addMoneyAsEditor = (jwtToken, moneyDetails) => {
	return axios.put(`${BASE_URL}/api/v1/employeeMoney`, moneyDetails, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}

export const getBusinessTripsPageable = (
	jwtToken,
	pageSize,
	pageNumber,
	startingDate,
	fullName
) => {
	const size = pageSize ? `pageSize=${pageSize}` : 'pageSize=10'
	const number = pageNumber ? `&pageNumber=${pageNumber}` : '&pageNumber=0'
	const url =
		!startingDate && !fullName
			? `${BASE_URL}/api/v1/businessTrips?${size}${number}`
			: !startingDate && fullName
			? `${BASE_URL}/api/v1/businessTrips/byEmployeeName/${encodeURIComponent(
					fullName
			  )}?${size}${number}`
			: startingDate && !fullName
			? `${BASE_URL}/api/v1/businessTrips/byDate?startingDate=${startingDate}&${size}${number}`
			: `${BASE_URL}/api/v1/businessTrips/byNameAndDate/${encodeURIComponent(
					fullName
			  )}?startingDate=${startingDate}&${size}${number}`
	return axios.get(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwtToken}`,
		},
		withCredentials: true,
	})
}
