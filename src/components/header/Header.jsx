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
                    <li><NavLink className='nav-element' to='/workers'>İşçilər</NavLink></li>
                    <li><NavLink className='nav-element' to='/business-trips'>Ezamiyyətlər</NavLink></li>
                    <li><NavLink className='nav-element' to='/reports'>Hesabatlar</NavLink></li>
                    <li><NavLink className='nav-element' to='/other-operations'>Digər əməliyyatlar</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;