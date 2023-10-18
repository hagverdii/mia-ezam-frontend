import './Header.css'
import {NavLink} from "react-router-dom";

const Header = () => {
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
                    <li><NavLink className='nav-element' to='/operations'>İşçilər</NavLink></li>
                    <li><NavLink className='nav-element' to='/operations'>Ezamiyyətlər</NavLink></li>
                    <li><NavLink className='nav-element' to='/operations'>Hesabatlar</NavLink></li>
                    <li><NavLink className='nav-element' to='/operations'>Digər əməliyyatlar</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;