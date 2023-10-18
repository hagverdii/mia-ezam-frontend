import {useRef, useState, useEffect} from "react";
import {loginUser} from "../../api/axiosApi.js";
import './Login.css'
import {EyeIcon, EyeSlashIcon} from "../../assets/icons.jsx";
import useAuth from "../../hooks/useAuth.js";
import {Link, useNavigate, useLocation} from "react-router-dom";

const LOGIN_URL = '/api/auth/signin'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const {setAuth} = useAuth()
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
            const response = await loginUser(LOGIN_URL, {username: user, password: pwd})
            const jwtToken = response?.data?.jwt
            const roles = response?.data?.roles
            setAuth({user, pwd, roles, jwtToken})
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
                setErrMsg('Login error')
            }
            errRef.current.focus()
        }
    }

    return (
        <div className='login-container'>
            <header className='login-header'>
                <img src='/mia-logo.png' alt='logo'/>
                <div>
                    <p>Daxili Işlər Nazirliyi</p>
                    <p>Ezamiyyət sistemi</p>
                </div>
            </header>
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
                        <button disabled={!user || !pwd}>Daxil ol</button>
                    </form>
                </section>
            </div>
            <footer className='login-footer'>
                <p>&copy; &ldquo;2023&rdquo; Daxili İşlər Nazirliyi - Bütün hüquqlar qorunur.</p>
            </footer>
        </div>
    );
};

export default Login;