import { useRef, useState, useEffect } from 'react'
import { loginUser } from '../../api/axiosApi.js'
import './LoginPage.css'
import { EyeIcon, EyeSlashIcon } from '../../assets/heroicons.jsx'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import LoadingCircle from '../LoadingCircle/LoadingCircle.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useMutation } from '@tanstack/react-query'
import Loading from '../Loading/Loading.jsx'

const LoginPage = () => {
	// Global variables
	const { auth, login, isVerifying } = useAuth()

	// React router variables
	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/'

	const userRef = useRef()
	const errRef = useRef()

	const [user, setUser] = useState('')
	const [pwd, setPwd] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [errMsg, setErrMsg] = useState('')

	// Mutation for login function
	const signInMutation = useMutation({
		mutationFn: ({ username, password }) => loginUser({ username, password }),
		onSuccess: (data) => {
			login(data)
			navigate(from, { replace: true })
		},
		onError: (error) => {
			if (!error?.response) {
				setErrMsg('Server cavab vermir')
			} else if (error.response?.status === 400) {
				setErrMsg('İstifadəşi adı və ya şifrə yazılmayıb')
			} else if (error.response?.status === 401) {
				setErrMsg('Yanlış ad və ya şifrə')
			} else {
				setErrMsg('LoginPage error')
			}
			errRef.current.focus()
		},
	})

	useEffect(() => {
		setErrMsg('')
	}, [user, pwd])

	// Form submit handle function
	const handleSubmit = async (e) => {
		e.preventDefault()
		signInMutation.mutate({
			username: user,
			password: pwd,
		})
	}

	return (
		<>
			{/* If jwt inside AuthContext is in verification process display loading screen */}
			{isVerifying && <Loading />}
			{/* If jwt verification is over and user is authenticated navigate to home page */}
			{!isVerifying && auth?.isAuth && <Navigate to='/' />}
			{/* If jwt verification is over and user is not authenticated display login page */}
			{!isVerifying && !auth?.isAuth && (
				<div className='login-container'>
					<div className='login-page'>
						<section>
							<p
								ref={errRef}
								className={errMsg ? 'errmsg' : 'offscreen'}
								aria-live='assertive'
							>
								{errMsg}
							</p>
							<h1 style={{ textAlign: 'center' }}>Daxil ol</h1>
							<form onSubmit={handleSubmit}>
								<label
									style={{ marginBottom: '.2rem' }}
									htmlFor='username'
								>
									İstifadəçi:
								</label>
								<input
									type='text'
									id='username'
									ref={userRef}
									autoComplete='off'
									value={user}
									onChange={(e) => setUser(e.target.value)}
									required
								/>
								<label
									style={{ marginBottom: '.2rem' }}
									htmlFor='password'
								>
									Şifrə:
								</label>
								<div className='password-container'>
									<input
										type={showPassword ? 'text' : 'password'}
										id='password'
										autoComplete='off'
										value={pwd}
										onChange={(e) => setPwd(e.target.value)}
										required
									/>
									<span
										className='eye-icon'
										onMouseDown={(e) => {
											e.preventDefault()
											setShowPassword((prev) => !prev)
										}}
									>
										{showPassword ? <EyeSlashIcon /> : <EyeIcon />}
									</span>
								</div>
								<button disabled={!user || !pwd || signInMutation.isPending}>
									{signInMutation.isPending ? <LoadingCircle /> : 'Təsdiqlə'}
								</button>
							</form>
						</section>
					</div>
					<footer className='login-footer'>
						<p>
							&copy; &ldquo;2023&rdquo; Daxili İşlər Nazirliyi - Bütün hüquqlar
							qorunur.
						</p>
					</footer>
				</div>
			)}
		</>
	)
}

export default LoginPage
