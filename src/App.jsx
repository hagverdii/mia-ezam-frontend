import { Suspense, lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Loading from './components/Loading/Loading.jsx'
import LoginPage from './components/LoginPage/LoginPage.jsx'
import RequireAuth from './components/RequireAuth/RequireAuth.jsx'
import { useAuth } from './context/AuthContext.jsx'
const MissingPage = lazy(() =>
	import('./components/MissingPage/MissingPage.jsx')
)
const UnauthorizedPage = lazy(() =>
	import('./components/UnauthorizedPage/UnauthorizedPage.jsx')
)
const OperationsPage = lazy(() =>
	import('./components/OperationsPage/OperationsPage.jsx')
)
const EmployeesPage = lazy(() =>
	import('./components/EmployeesPage/EmployeesPage.jsx')
)
const BusinessTripsPage = lazy(() =>
	import('./components/BusinessTripsPage/BusinessTripsPage.jsx')
)
const ReportsPage = lazy(() =>
	import('./components/ReportsPage/ReportsPage.jsx')
)
const OtherOperationsPage = lazy(() =>
	import('./components/OtherOperationsPage/OtherOperationsPage.jsx')
)
const TripDetailsPageEditor = lazy(() =>
	import('./components/TripDetailsPage/TripDetailsPageEditor.jsx')
)
const TripDetailsPageAdmin = lazy(() =>
	import('./components/TripDetailsPage/TripDetailsPageAdmin.jsx')
)

const App = () => {
	const { auth } = useAuth()
	return (
		<>
			<Toaster
				duration='4000'
				position='bottom-right'
				reverseOrder={false}
			/>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route
						path='/login'
						element={<LoginPage />}
					/>
					<Route element={<Layout />}>
						<Route
							element={
								<RequireAuth allowedRoles={['ROLE_ADMIN', 'ROLE_EDITOR']} />
							}
						>
							<Route
								path='/'
								element={
									<Navigate
										to='/business-trips'
										replace
									/>
								}
							/>
							<Route
								path='business-trips'
								element={<BusinessTripsPage />}
							/>
							<Route
								path='business-trips/:id'
								element={
									auth?.roles?.find((role) => role === 'ROLE_ADMIN') ? (
										<TripDetailsPageAdmin />
									) : (
										<TripDetailsPageEditor />
									)
								}
							/>
						</Route>
						<Route element={<RequireAuth allowedRoles={['ROLE_ADMIN']} />}>
							<Route
								path='operations'
								element={<OperationsPage />}
							/>
							<Route
								path='employees'
								element={<EmployeesPage />}
							/>
							<Route
								path='reports'
								element={<ReportsPage />}
							/>
							<Route
								path='other-operations'
								element={<OtherOperationsPage />}
							/>
						</Route>
					</Route>
					<Route
						path='/unauthorized'
						element={<UnauthorizedPage />}
					/>
					<Route
						path='*'
						element={<MissingPage />}
					/>
				</Routes>
			</Suspense>
		</>
	)
}

export default App
