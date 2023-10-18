import {useRef, useState, useEffect, useContext} from "react";
import AuthContext from "../../context/AuthProvider.jsx";
import {loginUser} from "../../api/axiosApi.js";
import './Login.css'
import {EyeIcon, EyeSlashIcon} from "../../assets/icons.jsx";

const LOGIN_URL = '/api/auth/signin'

const Login = () => {
    const {setAuth} = useContext(AuthContext)
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

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
            setSuccess(true)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username or password')
            } else if (err.response?.status === 401) {
                setErrMsg('Wrong username or password')
            } else {
                setErrMsg('Login failed')
            }
            errRef.current.focus()
        }
    }

    return (
        <div className='login-container'>
            <header className='login-header'>
                <img src='/mia-logo.png' alt='logo'/>
            </header>
            <div className='login-page'>
                {success ? (
                    <section>
                        <h1>You are logged in!</h1>
                        <br />
                        <p>
                            <a href="#">Go to Home</a>
                        </p>
                    </section>
                ) : (
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
                        <p>
                            Need an Account?<br />
                            <span className="line">
                                {/*put router link here*/}
                                <a href="#">Sign Up</a>
                            </span>
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Login;