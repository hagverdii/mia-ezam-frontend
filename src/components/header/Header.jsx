import './Header.css'
import {NavLink, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import {LogOutIcon} from '../../assets/heroicons.jsx'

const Header = () => {
    const {auth, setAuth} = useAuth()
    const navigate = useNavigate()

    return (
        <header>
            <img src='/mia-logo.png' alt='logo'/>
            <div>
                <p>Daxili Işlər Nazirliyi</p>
                <p>Ezamiyyət sistemi</p>
            </div>
            <nav>
                <ul>
                    <li><NavLink className='nav-element' to='/operations'>Əməliyyatlar</NavLink></li>
                    <li><NavLink className='nav-element' to='/workers'>İşçilər</NavLink></li>
                    <li><NavLink className='nav-element' to='/business-trips'>Ezamiyyətlər</NavLink></li>
                    <li><NavLink className='nav-element' to='/reports'>Hesabatlar</NavLink></li>
                    <li><NavLink className='nav-element' to='/other-operations'>Digər əməliyyatlar</NavLink></li>
                </ul>
            </nav>
            <div className='user-bar'>
                <p><strong>Istifadəçi:</strong><br/>{auth.user}</p>
                <button onClick={() => {
                    setAuth({})
                    navigate('/login')
                }}><LogOutIcon /></button>
            </div>
        </header>
    );
};

export default Header;