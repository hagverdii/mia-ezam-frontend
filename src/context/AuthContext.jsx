import { jwtDecode } from 'jwt-decode'
import { createContext, useContext, useEffect, useState } from 'react'
import { verifyJwt } from '../api/axiosApi'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	// Globally exported variables
	const [auth, setAuth] = useState(null)
	const [isVerifying, setIsVerifying] = useState(true)

	// On component mount verify the jwt token, if not valid then redirect to login page
	useEffect(() => {
		const verifyLogin = async () => {
			const jwtToken = JSON.parse(localStorage.getItem('token')) || null
			const name = JSON.parse(localStorage.getItem('name')) || ''
			if (!jwtToken) {
				setAuth(null)
				setIsVerifying(false)
			} else {
				try {
					await verifyJwt(jwtToken)
					const decoded = jwtDecode(jwtToken)
					const roles = decoded?.authorities || []
					setAuth({ jwtToken, roles, isAuth: true, name })
				} catch (err) {
					localStorage.removeItem('token')
					localStorage.removeItem('name')
					setAuth(null)
				} finally {
					setIsVerifying(false)
				}
			}
		}
		verifyLogin()
	}, [])

	// Function to login user and save data to local storage
	const login = (data) => {
		const jwtToken = data?.jwt
		const name = data?.name
		const decoded = jwtToken ? jwtDecode(jwtToken) : undefined
		const roles = decoded?.authorities || []
		setAuth({ jwtToken, roles, authenticated: true, name })
		localStorage.setItem('token', JSON.stringify(jwtToken))
		localStorage.setItem('name', JSON.stringify(name))
	}

	// Function to logout user and save data to local storage
	const logout = () => {
		setAuth({})
		localStorage.removeItem('token')
		localStorage.removeItem('name')
	}

	return (
		<AuthContext.Provider value={{ auth, setAuth, login, logout, isVerifying }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
