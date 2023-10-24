import LoginPage from "./components/LoginPage/LoginPage.jsx"
import {Routes, Route, Navigate} from "react-router-dom"
import MissingPage from "./components/MissingPage/MissingPage.jsx"
import Layout from "./components/Layout/Layout.jsx"
import RequireAuth from "./components/RequireAuth/RequireAuth.jsx"
import UnauthorizedPage from "./components/UnauthorizedPage/UnauthorizedPage.jsx"
import OperationsPage from "./components/OperationsPage/OperationsPage.jsx"
import EmployeesPage from "./components/EmployeesPage/EmployeesPage.jsx"
import BusinessTripsPage from "./components/BusinessTripsPage/BusinessTripsPage.jsx"
import ReportsPage from "./components/ReportsPage/ReportsPage.jsx"
import OtherOperationsPage from "./components/OtherOperationsPage/OtherOperationsPage.jsx"
import Header from "./components/Header/Header.jsx"
import {Toaster} from "react-hot-toast";

const App = () => {
    return (
        <>
            <Toaster duration='3000' position="bottom-right" reverseOrder={false} />
            <Header />
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route element={<Layout />}>
                    <Route element={<RequireAuth allowedRoles={['ROLE_ADMIN', 'ROLE_EDITOR']} />}>
                        <Route path='/' element={<Navigate to='/business-trips' replace />} />
                        <Route path='business-trips' element={<BusinessTripsPage />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={['ROLE_ADMIN']} />}>
                        <Route path='operations' element={<OperationsPage />} />
                        <Route path='employees' element={<EmployeesPage />} />
                        <Route path='reports' element={<ReportsPage />} />
                        <Route path='other-operations' element={<OtherOperationsPage />} />
                    </Route>
                </Route>
                <Route path='/unauthorized' element={<UnauthorizedPage />} />
                <Route path='*' element={<MissingPage />} />
            </Routes>
        </>
    );
};

export default App