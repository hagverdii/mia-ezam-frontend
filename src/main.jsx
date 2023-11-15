import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import jwt_decode from 'jwt-decode'
import useAuth from './hooks/useAuth.js'
import { verifyJwt } from './api/axiosApi.js'
import useLogout from './hooks/useLogout.js'
import Loading from './components/Loading/Loading.jsx'

const queryClient = new QueryClient()

if (process.env.NODE_ENV === 'production') {
	disableReactDevTools()
}

const Root = () => {
	const { setAuth } = useAuth()
	const navigate = useNavigate()
	const logout = useLogout()
	const [isLoading, setIsLoading] = useState(true)

	const signOut = () => {
		logout()
		navigate('/login')
	}

	useEffect(() => {
		const verifyAuthentication = async () => {
			const jwtToken = JSON.parse(localStorage.getItem('token')) || null
			const name = JSON.parse(localStorage.getItem('name')) || null
			if (jwtToken) {
				try {
					const response = await verifyJwt(jwtToken)
					const decoded = jwtToken ? jwt_decode(jwtToken) : undefined
					const roles = decoded?.authorities || []
					setAuth({ jwtToken, roles, authenticated: true, name })
				} catch (err) {
					signOut()
				} finally {
					setIsLoading(false)
				}
			} else {
				setIsLoading(false)
			}
		}
		verifyAuthentication()
	}, [])

	return isLoading ? <Loading /> : <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<AuthProvider>
				<Root />
			</AuthProvider>
		</BrowserRouter>
	</QueryClientProvider>
	// </React.StrictMode>,
)
