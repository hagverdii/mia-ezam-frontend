import './Header.css'
import { NavLink, useNavigate } from 'react-router-dom'
import useLogout from '../../hooks/useLogout.js'
import { LogOutIcon } from '../../assets/heroicons.jsx'
import useAuth from '../../hooks/useAuth.js'

const Header = () => {
	const { auth } = useAuth()
	const logout = useLogout()
	const navigate = useNavigate()

	const signOut = () => {
		logout()
		navigate('/login')
	}

	return auth?.authenticated ? (
		<header className='main-header'>
			<img
				src='/mia-logo.png'
				alt='logo'
			/>
			<div>
				<p>Daxili İşlər Nazirliyi</p>
				<p>Ezamiyyət Sistemi</p>
			</div>
			<nav>
				<ul>
					{auth?.roles.includes('ROLE_ADMIN') ? (
						<>
							<li>
								<NavLink
									className='nav-element'
									to='/operations'
								>
									Əməliyyatlar
								</NavLink>
							</li>
							<li>
								<NavLink
									className='nav-element'
									to='/employees'
								>
									İşçilər
								</NavLink>
							</li>
							<li>
								<NavLink
									className='nav-element'
									to='/business-trips'
								>
									Ezamiyyətlər
								</NavLink>
							</li>
							<li>
								<NavLink
									className='nav-element'
									to='/reports'
								>
									Hesabatlar
								</NavLink>
							</li>
							<li>
								<NavLink
									className='nav-element'
									to='/other-operations'
								>
									Digər əməliyyatlar
								</NavLink>
							</li>
						</>
					) : auth?.roles.includes('ROLE_EDITOR') ? (
						<li>
							<NavLink
								className='nav-element'
								to='/business-trips'
							>
								Ezamiyyətlər
							</NavLink>
						</li>
					) : null}
				</ul>
			</nav>
			<div className='user-bar'>
				<p>
					<strong>Istifadəçi:</strong>
					<br />
					{auth.name}
				</p>
				<button onMouseDown={signOut}>
					<LogOutIcon />
				</button>
			</div>
		</header>
	) : (
		<header className='login-header'>
			<img
				src='/mia-logo.png'
				alt='logo'
			/>
			<div>
				<p>Daxili İşlər Nazirliyi</p>
				<p>Ezamiyyət Sistemi</p>
			</div>
		</header>
	)
}

export default Header
