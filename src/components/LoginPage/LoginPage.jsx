import {useRef, useState, useEffect} from "react";
import {loginUser} from "../../api/axiosApi.js";
import './LoginPage.css'
import {EyeIcon, EyeSlashIcon} from "../../assets/heroicons.jsx";
import useAuth from "../../hooks/useAuth.js";
import {useNavigate, useLocation, Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const {auth, setAuth} = useAuth()
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await loginUser({username: user, password: pwd})
            const jwtToken = response?.data?.jwt
            const name = response?.data?.name
            const decoded = jwtToken
                ? jwt_decode(jwtToken)
                : undefined
            const roles = decoded?.authorities || []
            setAuth({jwtToken, roles, authenticated: true, name})
            localStorage.setItem('token', JSON.stringify(jwtToken))
            localStorage.setItem('name', JSON.stringify(name))
            setUser('')
            setPwd('')
            navigate(from, {replace: true})
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Server cavab vermir')
            } else if (err.response?.status === 400) {
                setErrMsg('Ad və ya parol yazılmayıb')
            } else if (err.response?.status === 401) {
                setErrMsg('Səhv login və ya parol')
            } else {
                setErrMsg('LoginPage error')
            }
            errRef.current.focus()
        }
    }

    return (
        auth?.authenticated ? <Navigate to='/'/> :
        <div className='login-container'>
            <div className='login-page'>
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 style={{textAlign: 'center'}}>Daxil ol</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type='text'
                            id='username'
                            ref={userRef}
                            autoComplete='off'
                            value={user}
                            onChange={e => setUser(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                autoComplete='off'
                                value={pwd}
                                onChange={e => setPwd(e.target.value)}
                                required
                            />
                            <span className="eye-icon" onMouseDown={(e) => { e.preventDefault(); setShowPassword(prev => !prev) }}>
                                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </span>
                        </div>
                        <button disabled={!user || !pwd}>Təsdiqlə</button>
                    </form>
                </section>
            </div>
            <footer className='login-footer'>
                <p>&copy; &ldquo;2023&rdquo; Daxili İşlər Nazirliyi - Bütün hüquqlar qorunur.</p>
            </footer>
        </div>
    );
};

export default LoginPage;